import { useRef } from 'react';
import { useMusic } from '../context/MusicContext';

interface UploadButtonProps {
  compact?: boolean;
}

export const UploadButton = ({ compact = false }: UploadButtonProps) => {
  const { addSongs } = useMusic();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      await addSongs(e.target.files);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const labelClass = compact
    ? 'bg-yellow-500 hover:bg-yellow-400 text-black px-3 py-2 rounded-lg cursor-pointer transition-colors inline-flex items-center space-x-2 font-semibold text-sm'
    : 'bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-3 rounded-lg cursor-pointer transition-colors inline-flex items-center space-x-2 font-semibold';

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*"
        multiple
        onChange={handleFileChange}
        className="hidden"
        id={compact ? 'file-upload-compact' : 'file-upload'}
      />
      <label
        htmlFor={compact ? 'file-upload-compact' : 'file-upload'}
        className={labelClass}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        <span>{compact ? 'Upload' : 'Upload Music'}</span>
      </label>
    </>
  );
};
