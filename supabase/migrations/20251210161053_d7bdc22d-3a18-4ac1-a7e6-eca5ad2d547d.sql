-- Allow guest checkout by adding policies for orders with null user_id
CREATE POLICY "Anyone can create guest orders" 
ON public.orders 
FOR INSERT 
WITH CHECK (user_id IS NULL);

-- Allow creating order items for guest orders
CREATE POLICY "Anyone can create order items for guest orders" 
ON public.order_items 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM orders 
    WHERE orders.id = order_items.order_id 
    AND orders.user_id IS NULL
  )
  OR auth.uid() IS NOT NULL
);