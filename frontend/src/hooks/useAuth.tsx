import { createContext, useContext, useState, type ReactNode } from 'react';
import type { User } from '../models/models';
// import { MOCK_USER } from '../services';

// to be replaced with the acutal implementation of authUser

// to be replaced with mock user data from userServices.
const FAKE_USER: User = {
  FirstName: 'John',
  LastName: 'Smith',
  Email: 'john.smith@example.com',
  PhoneNumber: '201-123-4567',
  Username: 'johnsmith',
};

export interface AuthResult {
  ok: boolean;
  error: string | null;
}
