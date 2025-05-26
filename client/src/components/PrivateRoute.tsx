import { ReactElement } from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../store'

export interface PrivateRouteProps {
  children: ReactElement
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const token = useAppSelector(state => state.auth.token)
  return token ? children : <Navigate to="/login" replace />
}
