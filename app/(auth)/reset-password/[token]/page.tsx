import { ResetPasswordForm } from '@/features/auth/components/reset-password-form'

export default function ResetPasswordPage({
  params,
}: {
  params: { token: string }
}) {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <ResetPasswordForm token={params.token} />
    </div>
  )
}
