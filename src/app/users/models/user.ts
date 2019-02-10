export interface User {
  _id?: string;
  guid?: string;
  isActive?: boolean;
  balance?: string | number;
  picture?: string;
  age?: number | string;
  eyeColor?: string;
  name?: string;
  gender?: string;
  company?: string;
  email?: string;
  phone?: string;
  address?: string;
  about?: string;
  registered?: string;
  latitude?: number;
  longitude?: number;
  tags?: string[];
}
