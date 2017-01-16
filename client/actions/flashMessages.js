import { ADD_FLASH_MESSAGE } from './types';

// Action creator
export function addFlashMessage(message) {
  return {
    type: ADD_FLASH_MESSAGE,
    message
  }
}
