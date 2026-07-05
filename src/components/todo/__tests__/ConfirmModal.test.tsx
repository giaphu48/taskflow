import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmModal from '../ConfirmModal';

describe('ConfirmModal', () => {
  const mockOnClose = jest.fn();
  const mockOnConfirm = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('không hiển thị khi isOpen là false', () => {
    render(
      <ConfirmModal
        isOpen={false}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        title="Test Title"
        message="Test Message"
      />
    );
    expect(screen.queryByText('Test Title')).not.toBeInTheDocument();
  });

  it('hiển thị chính xác khi isOpen là true', () => {
    render(
      <ConfirmModal
        isOpen={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        title="Test Title"
        message="Test Message"
      />
    );
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Message')).toBeInTheDocument();
  });

  it('gọi hàm onClose khi bấm nút Hủy', () => {
    render(
      <ConfirmModal
        isOpen={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        title="Test Title"
        message="Test Message"
      />
    );
    fireEvent.click(screen.getByText('Hủy'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('gọi hàm onConfirm và onClose khi bấm nút Xóa', () => {
    render(
      <ConfirmModal
        isOpen={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        title="Test Title"
        message="Test Message"
      />
    );
    fireEvent.click(screen.getByText('Xóa'));
    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
