import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoItem from '../TodoItem';

jest.mock('@dnd-kit/sortable', () => ({
  useSortable: () => ({
    attributes: {},
    listeners: {},
    setNodeRef: jest.fn(),
    transform: null,
    transition: null,
  }),
}));

describe('TodoItem', () => {
  const mockTodo = {
    id: '1',
    title: 'Test TodoItem',
    isCompleted: false,
    createdAt: Date.now()
  };

  const mockOnToggle = jest.fn();
  const mockOnDelete = jest.fn();
  const mockOnEdit = jest.fn();
  const mockOnMove = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('hiển thị tiêu đề công việc chính xác', () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
        onMove={mockOnMove}
        isDragDisabled={false}
      />
    );
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
  });

  it('gọi hàm onToggle khi click vào ô checkbox', () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
        onMove={mockOnMove}
        isDragDisabled={false}
      />
    );
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(mockOnToggle).toHaveBeenCalledWith('1');
  });

  it('gọi hàm onDelete khi click vào nút Xóa', () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
        onMove={mockOnMove}
        isDragDisabled={false}
      />
    );
    const deleteBtn = screen.getByTitle('Xóa công việc');
    fireEvent.click(deleteBtn);
    expect(mockOnDelete).toHaveBeenCalledWith('1');
  });

  it('mở menu tùy chọn và gọi hàm onMove khi chọn một mục', () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
        onMove={mockOnMove}
        isDragDisabled={false}
      />
    );
    const menuBtn = screen.getByTitle('Tùy chọn di chuyển');
    fireEvent.click(menuBtn);

    const moveTopBtn = screen.getByText(/Lên đầu danh sách/i);
    fireEvent.click(moveTopBtn);
    expect(mockOnMove).toHaveBeenCalledWith('1', 'top');
  });
});
