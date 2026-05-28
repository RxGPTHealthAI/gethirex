
-- 1) Prevent privilege escalation on user_roles
CREATE POLICY "Only admins can insert roles"
ON public.user_roles FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can update roles"
ON public.user_roles FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can delete roles"
ON public.user_roles FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- 2) Contact submissions: add DB-level constraints
ALTER TABLE public.contact_submissions
  ADD CONSTRAINT chk_name_len CHECK (char_length(name) BETWEEN 1 AND 200),
  ADD CONSTRAINT chk_email_len CHECK (char_length(email) BETWEEN 3 AND 254),
  ADD CONSTRAINT chk_email_fmt CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  ADD CONSTRAINT chk_company_len CHECK (company IS NULL OR char_length(company) <= 200),
  ADD CONSTRAINT chk_type_len CHECK (type IS NULL OR char_length(type) <= 100),
  ADD CONSTRAINT chk_msg_len CHECK (char_length(message) BETWEEN 1 AND 5000);

-- Replace permissive WITH CHECK true with explicit length-bounded checks
DROP POLICY IF EXISTS "Anyone can submit contact form" ON public.contact_submissions;
CREATE POLICY "Anyone can submit valid contact form"
ON public.contact_submissions FOR INSERT TO anon, authenticated
WITH CHECK (
  char_length(name) BETWEEN 1 AND 200
  AND char_length(email) BETWEEN 3 AND 254
  AND char_length(message) BETWEEN 1 AND 5000
  AND (company IS NULL OR char_length(company) <= 200)
  AND (type IS NULL OR char_length(type) <= 100)
);

-- 3) Lock down has_role: revoke from anon/public so unauthenticated probes are blocked.
-- Keep EXECUTE for authenticated (used inside RLS policies) and service_role.
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated, service_role;
