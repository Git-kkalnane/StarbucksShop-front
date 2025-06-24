import React from 'react';
import type { OrderItem } from '../../types/order';

export const OrderItemList: React.FC<{ items: OrderItem[] }> = ({ items }) => {
  const calculateItemTotal = (item: OrderItem) => {
    const optionsTotal = item.options?.reduce(
      (sum, opt) => sum + opt.additionalPrice * opt.quantity,
      0
    ) || 0;
    return (item.unitPrice + optionsTotal) * item.orderItemQuantity;
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <h3>주문 상품</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #eee' }}>상품명</th>
            <th style={{ textAlign: 'center', padding: '8px', borderBottom: '1px solid #eee' }}>수량</th>
            <th style={{ textAlign: 'right', padding: '8px', borderBottom: '1px solid #eee' }}>단가</th>
            <th style={{ textAlign: 'right', padding: '8px', borderBottom: '1px solid #eee' }}>합계</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <React.Fragment key={item.id}>
              <tr>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
                  <div>{item.itemName}</div>
                  {item.options && item.options.length > 0 && (
                    <div style={{ marginTop: '4px', fontSize: '0.9em', color: '#666' }}>
                      {item.options.map((option) => (
                        <div key={option.id} style={{ marginTop: '2px' }}>
                          • {option.syrupName}
                          {option.additionalPrice > 0 && ` (+${option.additionalPrice.toLocaleString()}원)`}
                          {option.quantity > 1 && ` x${option.quantity}`}
                        </div>
                      ))}
                    </div>
                  )}
                </td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee', textAlign: 'center', verticalAlign: 'top' }}>
                  {item.orderItemQuantity}
                </td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee', textAlign: 'right', verticalAlign: 'top' }}>
                  {item.unitPrice.toLocaleString()}원
                  {item.options && item.options.length > 0 && (
                    <div style={{ color: '#666' }}>
                      {item.options.reduce(
                        (sum, opt) => sum + opt.additionalPrice * opt.quantity,
                        0
                      ).toLocaleString()}원
                    </div>
                  )}
                </td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee', textAlign: 'right', verticalAlign: 'top' }}>
                  {calculateItemTotal(item).toLocaleString()}원
                </td>
              </tr>
            </React.Fragment>
          ))}
          <tr>
            <td colSpan={3} style={{ padding: '8px', borderBottom: '1px solid #eee', textAlign: 'right', fontWeight: 'bold' }}>
              총 합계
            </td>
            <td style={{ padding: '8px', borderBottom: '1px solid #eee', textAlign: 'right', fontWeight: 'bold' }}>
              {items
                .reduce(
                  (sum, item) => sum + calculateItemTotal(item),
                  0
                )
                .toLocaleString()}
              원
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
