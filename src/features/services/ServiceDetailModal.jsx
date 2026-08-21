import { Modal } from '../../components/ui/index.js';

export function ServiceDetailModal({ open, onClose, service }) {
  return (
    <Modal open={open} onClose={onClose} title={service?.title} size="lg">
      <p className="whitespace-pre-line text-sm leading-relaxed text-muted">{service?.details}</p>
    </Modal>
  );
}
