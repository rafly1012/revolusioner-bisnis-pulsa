import { router } from '@inertiajs/react';
import { Trash2Icon } from 'lucide-react';
import { useState } from 'react';
import AnnouncementController from '@/actions/App/Http/Controllers/Admin/AnnouncementController';
import { ConfirmPasswordDialog } from '@/components/confirm-password-dialog';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

interface Announcement {
    id: number;
    title?: string;
}

interface DeleteProps {
    announcement: Announcement;
}

export function Delete({ announcement }: DeleteProps) {
    const [openConfirm, setOpenConfirm] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button
                        variant="destructive"
                        size="icon-sm"
                        className="rounded-full"
                    >
                        <Trash2Icon />
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent size="sm">
                    <AlertDialogHeader>
                        <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                            <Trash2Icon />
                        </AlertDialogMedia>
                        <AlertDialogTitle>Hapus pengumuman?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Pengumuman
                            {announcement.title ? (
                                <b className="text-primary">
                                    {' '}
                                    {announcement.title}{' '}
                                </b>
                            ) : (
                                ''
                            )}{' '}
                            akan dihapus secara permanen dan tidak bisa
                            dikembalikan.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel variant="outline">
                            Batal
                        </AlertDialogCancel>
                        <AlertDialogAction variant="destructive" asChild>
                            <Button
                                onClick={() => setOpenConfirm(true)}
                                type="button"
                            >
                                Hapus
                            </Button>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Confirm Password */}
            <ConfirmPasswordDialog
                open={openConfirm}
                onOpenChange={setOpenConfirm}
                triggerHidden
                onConfirm={(password) => {
                    router.delete(
                        AnnouncementController.destroy(announcement.id).url,
                        {
                            data: { action_password: password },
                            onSuccess: () => {
                                setOpenConfirm(false);
                                setOpenDialog(false); // tutup dialog utama
                            },
                        },
                    );
                }}
            />
        </>
    );
}
