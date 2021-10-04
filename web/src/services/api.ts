import { getAPIClient, getAPISocial } from './axios';
import { ProviderType } from '../contexts/AuthContext';

// for all requests from the browser
export const api = getAPIClient();
