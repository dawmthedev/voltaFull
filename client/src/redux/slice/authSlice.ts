import { createSlice } from '@reduxjs/toolkit';

import { login, startVerification, register, verifyCode, completeVerification } from '../middleware/authentication';

const initialState = {
  loading: false,
  data: [],
  error: null,
  verificationData: null,
  verificationLoading: false,
  verificationError: null,
  isStartVerification: false,
  verifyCodeLoading: false,
  verifyCodeError: null
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    login: (state, action) => {
      state.loading = true;
    },
    register: (state, action) => {
      state.loading = true;
    },
    startVerification: (state, action) => {
      state.isStartVerification = action.payload;
    }
  },

  //login
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      if (document.cookie.indexOf('session=') !== -1) {
        document.cookie = 'session=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      }
      document.cookie = `session=${action.payload.token}`;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // register user
    builder.addCase(register.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    //verification
    builder.addCase(startVerification.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(startVerification.fulfilled, (state, action) => {
      state.loading = false;
      state.verificationData = action.payload;
      state.isStartVerification = true;
    });
    builder.addCase(startVerification.rejected, (state, action) => {
      state.loading = false;
      state.verificationError = action.payload;
    });

    //verify code
    builder.addCase(verifyCode.pending, (state) => {
      state.verifyCodeLoading = true;
      state.verifyCodeError = null; 
    });
    builder.addCase(verifyCode.fulfilled, (state, action) => {
      state.verifyCodeLoading = false;
      state.data = action.payload;
      state.verifyCodeError = null;
    });
    builder.addCase(verifyCode.rejected, (state, action) => {
      state.verifyCodeLoading = false;
      state.error = action.payload;
      state.verifyCodeError = 'Invalid code';
    });

    // complete verification
    builder.addCase(completeVerification.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(completeVerification.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isStartVerification = false;
    });
    builder.addCase(completeVerification.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  }
});

export default authSlice.reducer;

export const authSelector = (state) => state.auth;

export const { login: loginAction, register: registerAction, startVerification: startVerificationAction } = authSlice.actions;
