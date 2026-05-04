import { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import {
  Box,
  Stack,
  Button,
  Typography,
  CircularProgress,
  IconButton,
  Link,
  FormHelperText,
} from '@mui/material';
import Iconify from 'src/components/iconify';
import { supabase } from 'src/lib/supabase';

type Props = {
  name: string;
  label: string;
  accept?: string;
  multiple?: boolean;
  folder: string;
  required?: boolean;
};

const BUCKET = 'wood-cms';

function buildPath(folder: string, file: File) {
  const ext = file.name.split('.').pop() || 'bin';
  const safeName = file.name
    .replace(/\.[^.]+$/, '')
    .replace(/[^a-zA-Z0-9_-]/g, '_')
    .slice(0, 40);
  const uid = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  return `${folder}/${uid}-${safeName}.${ext}`;
}

async function uploadOne(folder: string, file: File): Promise<string> {
  const path = buildPath(folder, file);
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  });
  if (error) throw error;
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export default function UploadField({
  name,
  label,
  accept = 'image/*,application/pdf',
  multiple = false,
  folder,
  required = false,
}: Props) {
  const { control } = useFormContext();
  const [uploading, setUploading] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const value = field.value;

        const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
          const files = Array.from(e.target.files || []);
          if (!files.length) return;
          setUploading(true);
          try {
            if (multiple) {
              const urls = await Promise.all(files.map((f) => uploadOne(folder, f)));
              const current: string[] = Array.isArray(value) ? value : [];
              field.onChange([...current, ...urls]);
            } else {
              const url = await uploadOne(folder, files[0]);
              field.onChange(url);
            }
          } catch (err: any) {
            console.error('Upload error:', err);
          } finally {
            setUploading(false);
            e.target.value = '';
          }
        };

        const removeAt = (idx: number) => {
          if (multiple && Array.isArray(value)) {
            field.onChange(value.filter((_: string, i: number) => i !== idx));
          } else {
            field.onChange('');
          }
        };

        const items: string[] = multiple
          ? Array.isArray(value)
            ? value
            : []
          : value
          ? [value]
          : [];

        return (
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              {label} {required && <span style={{ color: '#d32f2f' }}>*</span>}
            </Typography>

            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
              <Button
                variant="outlined"
                component="label"
                size="small"
                startIcon={
                  uploading ? (
                    <CircularProgress size={16} />
                  ) : (
                    <Iconify icon="carbon:upload" width={18} />
                  )
                }
                disabled={uploading}
              >
                {uploading ? 'Téléversement...' : multiple ? 'Ajouter des fichiers' : 'Choisir un fichier'}
                <input
                  hidden
                  type="file"
                  accept={accept}
                  multiple={multiple}
                  onChange={handleChange}
                />
              </Button>
            </Stack>

            {items.length > 0 && (
              <Stack spacing={0.5} sx={{ mt: 1 }}>
                {items.map((url, idx) => (
                  <Stack
                    key={`${url}-${idx}`}
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    sx={{
                      p: 1,
                      bgcolor: 'background.neutral',
                      borderRadius: 1,
                    }}
                  >
                    <Iconify icon="carbon:document" width={18} />
                    <Link
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        flex: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        fontSize: 13,
                      }}
                    >
                      {url.split('/').pop()}
                    </Link>
                    <IconButton size="small" onClick={() => removeAt(idx)} disabled={uploading}>
                      <Iconify icon="carbon:trash-can" width={18} />
                    </IconButton>
                  </Stack>
                ))}
              </Stack>
            )}

            {!!error && (
              <FormHelperText error sx={{ mx: 0, mt: 0.5 }}>
                {error.message}
              </FormHelperText>
            )}
          </Box>
        );
      }}
    />
  );
}
