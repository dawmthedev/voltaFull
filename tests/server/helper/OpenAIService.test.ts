import axios from 'axios';
import OpenAI from 'openai';
import { OpenAIService } from '../../../server/src/helper/OpenAIService';

jest.mock('axios');

const mockOpenAIInstance = {
  beta: {
    assistants: {
      create: jest.fn().mockResolvedValue({ id: 'assistant-id' }),
    },
    threads: {
      create: jest.fn().mockResolvedValue({ id: 'thread-id' }),
      messages: {
        create: jest.fn(),
        list: jest.fn(),
      },
      runs: {
        create: jest.fn().mockResolvedValue({ id: 'run-id' }),
        retrieve: jest.fn().mockResolvedValue({ status: 'completed' }),
      },
    },
  },
};

jest.mock('openai', () => {
  return { __esModule: true, default: jest.fn(() => mockOpenAIInstance) };
});

describe('OpenAIService', () => {
  const axiosPostMock = axios.post as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns transformed API data when question contains 'rate'", async () => {
    const apiResponse = {
      data: [
        {
          fulfillmentPartner: 'Partner1',
          years: 1,
          status: 'active',
          financing: 'cash',
          apr: '5',
          feeRate: '1',
        },
      ],
    };
    axiosPostMock.mockResolvedValue(apiResponse);

    const expected = JSON.stringify([
      {
        partner: 'Partner1',
        years: 1,
        status: 'active',
        financing: 'cash',
        apr: '5',
        feerate: '1',
      },
    ]);

    mockOpenAIInstance.beta.threads.messages.list.mockResolvedValue({
      data: [
        {
          run_id: 'run-id',
          role: 'assistant',
          content: [{ text: { value: expected } }],
        },
      ],
    });

    const service = new OpenAIService();
    const result = await service.askQuestion('What is the rate?');

    expect(result).toBe(expected);
    expect(axiosPostMock).toHaveBeenCalled();
    expect(
      mockOpenAIInstance.beta.threads.messages.create
    ).toHaveBeenCalledWith('thread-id', {
      role: 'user',
      content: `What is the rate?\n\nAPI Data: ${expected}`,
    });
  });
});
