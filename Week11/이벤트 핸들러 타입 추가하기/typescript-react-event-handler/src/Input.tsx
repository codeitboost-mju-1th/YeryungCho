import { ChangeEvent, useState } from 'react';

interface Props {
  className?: string;
  value?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function Input({ className = '', value = '', onChange }: Props) {
  return (
    <input className={className} value={value} onChange={onChange} />
  );
}

export default Input;