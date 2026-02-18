import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from './ui/input-group';

interface Props {
    onConfirm: (password: string) => void;
    triggerLabel?: string;
    loading?: boolean;
    error?: string;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    triggerHidden?: boolean;
}

export function ConfirmPasswordDialog({
    onConfirm,
    triggerLabel = 'Konfirmasi',
    loading,
    error,
    open,
    onOpenChange,
    triggerHidden,
}: Props) {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {!triggerHidden && (
                <DialogTrigger asChild>
                    <Button variant="destructive">{triggerLabel}</Button>
                </DialogTrigger>
            )}

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Konfirmasi Password</DialogTitle>
                    <DialogDescription>
                        Masukkan password admin untuk melanjutkan aksi ini.
                    </DialogDescription>
                </DialogHeader>

                <InputGroup>
                    <InputGroupInput
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputGroupAddon align="inline-end">
                        <InputGroupButton
                            type="button"
                            variant="outline"
                            size="icon-xs"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <EyeOff size={16} />
                            ) : (
                                <Eye size={16} />
                            )}
                        </InputGroupButton>
                    </InputGroupAddon>
                </InputGroup>

                {error && <InputError message={error} />}

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange?.(false)}
                    >
                        Batal
                    </Button>
                    <Button
                        disabled={!password || loading}
                        onClick={() => {
                            onConfirm(password);
                            setPassword('');
                            onOpenChange?.(false);
                        }}
                    >
                        Lanjutkan
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
