import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemTitle,
} from '@/components/ui/item';
import { useClipboard } from '@/hooks/use-clipboard';
import { cn } from '@/lib/utils';

interface CopyableItemProps {
    text: string;
    label?: string;
    className?: string;
    titleClassName?: string;
    buttonVariant?: 'default' | 'outline' | 'ghost' | 'link';
    buttonSize?: 'default' | 'sm' | 'lg' | 'icon' | 'icon-sm';
    onCopySuccess?: (text: string) => void;
    showCopyButton?: boolean;
}

export function CopyableItem({
    text,
    label,
    className,
    titleClassName,
    buttonVariant = 'outline',
    buttonSize = 'icon-sm',
    onCopySuccess,
    showCopyButton = true,
}: CopyableItemProps) {
    const [copiedText, copy] = useClipboard();
    const isCopied = copiedText === text;
    const IconComponent = isCopied ? Check : Copy;

    const handleCopy = () => {
        copy(text);
        onCopySuccess?.(text);
    };

    return (
        <Item className={cn(className)} size="xs" variant="muted">
            <ItemContent>
                {label && <ItemDescription>{label}</ItemDescription>}
                <ItemTitle
                    className={cn('font-mono font-medium', titleClassName)}
                >
                    {text}
                </ItemTitle>
            </ItemContent>
            {showCopyButton && (
                <ItemActions>
                    <Button
                        variant={buttonVariant}
                        size={buttonSize}
                        onClick={handleCopy}
                    >
                        <IconComponent />
                    </Button>
                </ItemActions>
            )}
        </Item>
    );
}
