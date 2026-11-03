import { ICartOrder } from '@/entities/cart/model/types';
import { useCallback, useState } from 'react';

type UndoDeleteProps = {
  cartOrder: ICartOrder[];
  removeOrder: (id: string) => void;
};

export const useUndoDelete = ({ cartOrder, removeOrder }: UndoDeleteProps) => {
  /* Храним удаленные товары до определенного времени */
  const [pendingDeletes, setPendingDeletes] = useState<string[]>([]);

  /* фильтруем из cartOrder те, чьи ID есть в pendingDeletes */
  const visibleCartOrder = cartOrder.filter(
    (item) => !pendingDeletes.includes(item.id)
  );

  /* Удаление товара из корзины и отображение undo-message */
  const handleRemoveOrder = (id: string) => {
    setPendingDeletes((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  /* При восстановлении товаров в корзине очищаем промежуточное состояние */
  const handleUndo = useCallback(() => {
    setPendingDeletes([]);
  }, []);

  /*Удаление  по истечению времени*/
  const handleComplete = useCallback(() => {
    pendingDeletes.forEach((id) => removeOrder(id));
    setPendingDeletes([]);
  }, [pendingDeletes, removeOrder]);

  return {
    visibleCartOrder,
    pendingDeletes,
    handleRemoveOrder,
    handleUndo,
    handleComplete,
  };
};
