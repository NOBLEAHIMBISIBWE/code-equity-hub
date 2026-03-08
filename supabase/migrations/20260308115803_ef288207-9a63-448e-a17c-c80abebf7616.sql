
-- Remove duplicate enrollment SELECT policy
DROP POLICY "Anyone can count enrollments" ON public.enrollments;
