import { createAction } from '@reduxjs/toolkit';
 
export const addToCart = createAction('cart/add_comic');
export const removeFromCart = createAction('cart/remove_comic');
export const updateAmount = createAction('cart/update_amount');