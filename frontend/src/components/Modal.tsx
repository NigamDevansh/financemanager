import type { ModalProps } from "../types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

const Modal = ({ isOpen, onClose, children, title }: ModalProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            if (!open) onClose();
        }}>
            <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto w-[95vw]">
                {title && (
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>
                    </DialogHeader>
                )}
                <div className="mt-2 text-foreground">
                    {children}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default Modal;
