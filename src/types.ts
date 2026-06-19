export type FarmerTool = 'idle' | 'seed-bag' | 'watering-can' | 'sickle' | 'success-sign';

export interface FieldCrop {
  id: number;
  positionX: number; // percentage from left
  rotation: number;
  delay: number;
}

export interface LoginState {
  emailInput: string;
  isEmailValid: boolean | null; // null = untouched/empty
  passwordInput: string;
  passwordStrength: number; // 0 to 100
  isSubmitting: boolean;
  isHarvested: boolean;
  activeScreen: 'login' | 'signup' | 'success';
}
