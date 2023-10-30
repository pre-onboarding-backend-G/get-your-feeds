export interface VerificationData {
  email: string;
  password: string;
  connectedServices: any[]; // 실제 타입에 맞게 변경해주세요.
  code: string;
  expires: number;
}
