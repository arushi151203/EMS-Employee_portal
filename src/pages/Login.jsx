import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { Layers, Mail, Lock, Eye, EyeOff, Users, Building2, Briefcase, Activity, X } from "lucide-react";
import { setSession } from "@/lib/auth";
import { login as loginApi } from "@/lib/authService";

const roleCredentials = {
  employee: { email: "employee.demo@nexus.io", password: "password" },
  hr: { email: "hr.demo@nexus.io", password: "hrpass123" },
  admin: { email: "admin.demo@nexus.io", password: "adminpass123" }
};

function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState("employee");
  const [mode, setMode] = useState("password");
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState(roleCredentials.employee.email);
  const [password, setPassword] = useState(roleCredentials.employee.password);
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [showSupportModal, setShowSupportModal] = useState(false);

  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotStep, setForgotStep] = useState("email");
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotOtp, setForgotOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [forgotError, setForgotError] = useState("");

  const resetForgotFlow = () => {
    setShowForgotModal(false);
    setForgotStep("email");
    setForgotEmail("");
    setForgotOtp("");
    setGeneratedOtp("");
    setNewPassword("");
    setConfirmPassword("");
    setForgotError("");
  };

  const handleSendOtp = () => {
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgotEmail.trim());
    if (!emailOk) {
      setForgotError("Enter a valid email address");
      return;
    }
    setForgotError("");
    const code = String(Math.floor(100000 + Math.random() * 900000));
    setGeneratedOtp(code);
    toast.info(`OTP sent (demo): ${code}`);
    setForgotStep("otp");
  };

  const handleVerifyOtp = () => {
    if (forgotOtp !== generatedOtp) {
      setForgotError("Incorrect code, try again");
      return;
    }
    setForgotError("");
    setForgotStep("reset");
  };

  const handleResetPassword = () => {
    if (newPassword.length < 4) {
      setForgotError("Password must be at least 4 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      setForgotError("Passwords do not match");
      return;
    }
    setForgotError("");
    toast.success("Password updated. Please sign in.");
    resetForgotFlow();
  };

  return <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      {
    /* Left panel */
  }
      <div className="relative hidden lg:flex flex-col justify-between p-10 bg-gradient-hero overflow-hidden">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-primary-glow/10 blur-3xl" />

        <div className="relative flex items-center gap-2.5">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary shadow-glow">
            <Layers className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="font-semibold text-lg">Nexus Technologies</div>
        </div>

        <div className="relative">
          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight">
            People-first<br />workforce platform
          </h1>
          <p className="mt-4 max-w-md text-muted-foreground">
            Streamline HR operations, track performance, and empower your team — all in one unified workspace.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-3 max-w-md">
            {[
    { icon: Users, value: "108", label: "Employees" },
    { icon: Building2, value: "6", label: "Departments" },
    { icon: Briefcase, value: "8", label: "Open roles" },
    { icon: Activity, value: "99.9%", label: "Uptime" }
  ].map((s) => <div key={s.label} className="rounded-2xl border border-border bg-card/50 backdrop-blur p-4">
                <s.icon className="h-4 w-4 text-primary" />
                <div className="mt-3 text-2xl font-semibold">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>)}
          </div>
        </div>

        <div className="relative text-xs text-muted-foreground">© 2024 Nexus Technologies</div>
      </div>

      {
    /* Right panel */
  }
      <div className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 flex items-center gap-2.5">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary">
              <Layers className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="font-semibold">Nexus Technologies</div>
          </div>

          <h2 className="text-3xl font-semibold tracking-tight">Sign in</h2>
          <p className="mt-1 text-sm text-muted-foreground">Welcome back to Nexus Technologies</p>

          <div className="mt-6 rounded-xl bg-surface p-1 grid grid-cols-3 text-sm">
            {["employee", "hr", "admin"].map((r) => <button
    key={r}
    onClick={() => {
      setRole(r);
      setEmail(roleCredentials[r].email);
      setPassword(roleCredentials[r].password);
      setEmailError("");
    }}
    className={`rounded-lg py-2 capitalize transition ${role === r ? "bg-surface-elevated text-foreground shadow-sm" : "text-muted-foreground"}`}
  >
                {r === "hr" ? "HR" : r}
              </button>)}
          </div>

          <div className="mt-6 flex gap-6 border-b border-border text-sm">
            {["password", "otp"].map((m) => <button
    key={m}
    onClick={() => setMode(m)}
    className={`pb-2 -mb-px border-b-2 uppercase tracking-wide text-xs font-medium ${mode === m ? "border-primary text-primary" : "border-transparent text-muted-foreground"}`}
  >
                {m}
              </button>)}
          </div>

          <form
    onSubmit={async (e) => {
      e.preventDefault();
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
      if (!emailOk) {
        setEmailError("Please enter a valid email address");
        return;
      }
      setEmailError("");
      if (mode === "password" && password.length < 4) {
        toast.error("Password must be at least 4 characters");
        return;
      }
      if (mode === "otp" && !/^\d{6}$/.test(otp)) {
        toast.error("Enter the 6-digit code");
        return;
      }

      if (mode === "otp") {
        toast.info("OTP login isn't connected to a real backend yet — use password login for now.");
        return;
      }

      setIsSubmitting(true);
      try {
        const res = await loginApi(email.trim(), password);
        const { user, token } = res.data;
        setSession(user, token);
        toast.success(`Welcome, ${user.name}!`);
        navigate(user.role === "admin" ? "/admin" : user.role === "hr" ? "/hr" : "/dashboard");
      } catch (err) {
        const message = err.response?.data?.message || "Login failed. Please try again.";
        toast.error(message);
      } finally {
        setIsSubmitting(false);
      }
    }}
    className="mt-6 space-y-4"
  >
            <div>
              <label className="text-xs font-medium text-muted-foreground">Email</label>
              <div className="mt-1 relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className="w-full rounded-lg bg-input border border-border pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/60"
  />
              </div>
              {emailError && <p className="mt-1 text-xs text-destructive">{emailError}</p>}
            </div>

            {mode === "password" ? <div>
                <label className="text-xs font-medium text-muted-foreground">Password</label>
                <div className="mt-1 relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
    type={showPass ? "text" : "password"}
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="w-full rounded-lg bg-input border border-border pl-9 pr-9 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/60"
  />
                  <button
    type="button"
    onClick={() => setShowPass((s) => !s)}
    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
    aria-label={showPass ? "Hide password" : "Show password"}
  >
                    {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <div className="mt-2 text-right">
                  <button
    type="button"
    onClick={() => {
      setForgotEmail(email);
      setShowForgotModal(true);
    }}
    className="text-xs text-primary hover:underline"
  >
                    Forgot password?
                  </button>
                </div>
              </div> : <div>
                <label className="text-xs font-medium text-muted-foreground">One-time code</label>
                <input
    type="text"
    value={otp}
    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
    placeholder="6-digit code"
    className="mt-1 w-full rounded-lg bg-input border border-border px-3 py-2.5 text-sm tracking-[0.4em] text-center focus:outline-none focus:ring-2 focus:ring-ring/60"
  />
                <button
    type="button"
    onClick={() => toast.info("New code sent (demo)")}
    className="mt-2 text-xs text-primary hover:underline"
  >
                  Resend code
                </button>
              </div>}

            <button
    type="submit"
    disabled={isSubmitting}
    className="w-full rounded-lg bg-gradient-primary py-2.5 text-sm font-medium text-primary-foreground shadow-glow transition hover:opacity-95 disabled:opacity-60"
  >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </button>
          </form>
          <div className="mt-4 text-center text-xs text-muted-foreground">
             Need help?{" "}
             <button
               type="button"
               onClick={() => setShowSupportModal(true)}
               className="text-primary hover:underline"
              >
              Contact support
            </button>
          </div>
        </div>
      </div>
      {showSupportModal && (
     <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-sm rounded-2xl border border-border bg-surface-elevated p-6 shadow-glow">
            <h3 className="text-lg font-semibold">Need Help?</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Can't sign in? Reach out to our support team.
            </p>
            <div className="mt-4 space-y-2 text-sm">
              <p className="text-muted-foreground">📧 support@nexustech.io</p>
              <p className="text-muted-foreground">📞 +91-XXXXXXXXXX</p>
            </div>
            <button
              type="button"
              onClick={() => setShowSupportModal(false)}
              className="mt-5 w-full rounded-lg bg-gradient-primary py-2.5 text-sm font-medium text-primary-foreground hover:opacity-95"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showForgotModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-sm rounded-2xl border border-border bg-surface-elevated p-6 shadow-glow relative">
            <button
              type="button"
              onClick={resetForgotFlow}
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            {forgotStep === "email" && (
              <>
                <h3 className="text-lg font-semibold">Reset your password</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Enter your email and we'll send you a verification code.
                </p>
                <div className="mt-4">
                  <label className="text-xs font-medium text-muted-foreground">Email</label>
                  <input
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    className="mt-1 w-full rounded-lg bg-input border border-border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/60"
                  />
                  {forgotError && <p className="mt-1 text-xs text-destructive">{forgotError}</p>}
                </div>
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="mt-5 w-full rounded-lg bg-gradient-primary py-2.5 text-sm font-medium text-primary-foreground hover:opacity-95"
                >
                  Send code
                </button>
              </>
            )}

            {forgotStep === "otp" && (
              <>
                <h3 className="text-lg font-semibold">Enter verification code</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  We sent a 6-digit code to {forgotEmail}.
                </p>
                <div className="mt-4">
                  <label className="text-xs font-medium text-muted-foreground">One-time code</label>
                  <input
                    type="text"
                    value={forgotOtp}
                    onChange={(e) => setForgotOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    placeholder="6-digit code"
                    className="mt-1 w-full rounded-lg bg-input border border-border px-3 py-2.5 text-sm tracking-[0.4em] text-center focus:outline-none focus:ring-2 focus:ring-ring/60"
                  />
                  {forgotError && <p className="mt-1 text-xs text-destructive">{forgotError}</p>}
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="mt-2 text-xs text-primary hover:underline"
                  >
                    Resend code
                  </button>
                </div>
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  className="mt-5 w-full rounded-lg bg-gradient-primary py-2.5 text-sm font-medium text-primary-foreground hover:opacity-95"
                >
                  Verify code
                </button>
              </>
            )}

            {forgotStep === "reset" && (
              <>
                <h3 className="text-lg font-semibold">Set a new password</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Choose a new password for your account.
                </p>
                <div className="mt-4 space-y-3">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">New password</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="mt-1 w-full rounded-lg bg-input border border-border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/60"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">Confirm password</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="mt-1 w-full rounded-lg bg-input border border-border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/60"
                    />
                  </div>
                  {forgotError && <p className="text-xs text-destructive">{forgotError}</p>}
                </div>
                <button
                  type="button"
                  onClick={handleResetPassword}
                  className="mt-5 w-full rounded-lg bg-gradient-primary py-2.5 text-sm font-medium text-primary-foreground hover:opacity-95"
                >
                  Update password
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>;
}
export default Login;