import { ResetPasswordForm } from '@/features/auth/components/reset-password-form'

export default function ResetPasswordPage({
  params,
}: {
  params: { token: string }
}) {
  return (
    <div className="w-full flex items-center justify-center">
      <ResetPasswordForm token={params.token} />
    </div>
  )
}
