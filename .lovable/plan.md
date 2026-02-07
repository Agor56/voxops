

# Secret Live Demo Page for VoxOps (/calldemo)

## Overview
A standalone, PIN-gated demo page at `/calldemo` designed for live sales calls. Prospects fill in their details, and Adam (the AI outbound agent) calls them within 60 seconds -- all while they're still on the call with you.

## Architecture

### New Files to Create

1. **`src/pages/CallDemo.tsx`** -- Main page component orchestrating the three states: PIN entry, Demo form, and Live call screen.

2. **`src/components/demo/PinGate.tsx`** -- PIN entry screen with:
   - VoxOps logo
   - "הדגמה פרטית" headline + "הזינו את קוד הגישה" subtext
   - 4-digit OTP input (using existing `input-otp` component)
   - Shake animation on wrong PIN, red error message
   - Smooth fade transition on success

3. **`src/components/demo/DemoForm.tsx`** -- Single-page form with:
   - Full name text input
   - Phone input with +972 prefix indicator and Israeli flag emoji
   - Business type pill-select buttons (7 options)
   - Pain point textarea (2 rows)
   - Timeline pill-select (3 options)
   - Submit button with pulse animation and loading spinner
   - Client-side session rate limit (max 3 submissions)

4. **`src/components/demo/LiveCallScreen.tsx`** -- Post-submission screen with:
   - Animated phone icon with expanding teal pulsing rings
   - 60-second countdown with glowing numbers
   - Transition to "Adam in call" state with voice waveform
   - Reset button to return to empty form
   - "powered by VoxOps" watermark

5. **`src/components/demo/VoiceWaveform.tsx`** -- Reusable animated voice waveform component (thin teal bars, like a heartbeat monitor)

6. **`supabase/functions/demo-submit/index.ts`** -- Backend function to:
   - Validate the PIN (against `DEMO_PIN` env var)
   - Validate form data with Zod
   - Convert phone to +972 international format
   - Forward to webhook (`https://n8n.srv1100597.hstgr.cloud/webhook/web_submission`)
   - Handle CORS

### Files to Modify

1. **`src/App.tsx`** -- Add route `/calldemo` pointing to `CallDemo` page

2. **`index.html`** -- No changes needed (meta robots noindex will be set at page level via React Helmet or a component-level approach)

3. **`supabase/config.toml`** -- Register the new `demo-submit` edge function with `verify_jwt = false`

4. **`public/robots.txt`** -- Add `Disallow: /calldemo` rule

## Detailed Design

### PIN Gate Screen
- Centered vertically and horizontally
- VoxOps text logo at top (same font/style as header)
- Uses the existing `InputOTP` component for 4 digit boxes
- PIN validation calls the `demo-submit` edge function with a `validate_pin` action
- Wrong PIN triggers CSS shake animation + "קוד שגוי" red text
- Correct PIN fades in the demo content using framer-motion `AnimatePresence`

### Demo Form
- Wrapped in a glass-card matching the Adam agent card style (dark bg, teal gradient border glow)
- Hero section above form:
  - Same background glow effects (hero-glow orbs)
  - "הכירו את אדם -- בזמן אמת" headline (section-title + gradient-text classes)
  - Subheadline in muted-foreground
  - Animated voice waveform visualization (5-7 thin teal bars with staggered CSS animation)
- Form fields use existing `Input` and `Textarea` components
- Business type and timeline use pill-select buttons (styled like the contact form step3 option buttons with teal border on select)
- Phone field shows a "+972" prefix badge inside the input
- Submit button uses `hero` variant with added pulse animation keyframe
- Loading state replaces button text with a spinner

### "What will happen?" Section
- Three cards in a horizontal row below the form
- Each card: glass-card style, icon + description text
- Icons: Phone, MessageSquare, Check (from lucide-react) -- no emojis
- Cards use the same green checkmark icon pattern from AgentsSection

### Live Call Screen
- Smooth crossfade from form card (AnimatePresence)
- Large phone icon centered with 3 concentric expanding/fading teal rings (CSS animation similar to hero-pulse-ring)
- Countdown: large JetBrains Mono numbers with teal text-shadow glow, updating every second
- Pulse glow animation on numbers as they tick
- At 0: headline changes, phone icon swaps to voice waveform, reset button appears
- "powered by VoxOps" small text at bottom

### Webhook Submission
The `demo-submit` edge function handles two actions:
- `validate_pin`: Checks the provided PIN against `DEMO_PIN` env var
- `submit_demo`: Validates form data, converts phone format, forwards to webhook with the specified JSON body including `demo_mode: true`

### Environment & Secrets
- A new secret `DEMO_PIN` needs to be added (will prompt user to enter the 4-digit PIN value)
- The webhook URL is hardcoded in the edge function (same as existing contact-form)

## Technical Details

### Route Registration
```text
App.tsx: <Route path="/calldemo" element={<CallDemo />} />
```

### SEO Prevention
- Page-level: `<meta name="robots" content="noindex, nofollow">` set via `useEffect` on mount
- `robots.txt`: Add `Disallow: /calldemo`
- No links to `/calldemo` from any navigation, footer, or sitemap

### Session Rate Limiting
- Client-side counter using `useState` (resets on page refresh)
- After 3 submissions: form is replaced with "הגעתם למגבלת ההדגמות. צרו קשר להמשך."
- Server-side rate limiting also enforced in the edge function (5 req/min per IP)

### Design Tokens Used
- Background: `bg-background` (dark: `hsl(185 50% 6%)`)
- Cards: `glass-card` class (teal glassmorphism)
- Buttons: `hero` variant (teal gradient + glow)
- Text: `text-foreground`, `text-muted-foreground`
- Gradients: `gradient-text`, `glow-text` classes
- Typography: `font-display` (Space Grotesk), `font-mono` (JetBrains Mono)
- Animations: existing `hero-pulse-ring`, `siri-pulse` keyframes + new countdown glow

### Responsive Design
- Optimized for desktop (screen share context) with responsive fallbacks
- Max-width container centered
- Pill-select buttons wrap on smaller screens
- Steps section stacks vertically on mobile

### Header Integration
- Reuses the existing `Header` component as-is
- The `/calldemo` page is NOT added to nav items
- All nav links still work (scroll to sections on main page via anchor links)

### Sound Effect (Bonus)
- Soft ring sound via Web Audio API oscillator (no external file needed)
- Small mute/unmute toggle in corner of live call screen
- Sound starts when countdown begins, stops at 0

### Confetti (Bonus)
- Brief 1-2 second teal/green particle burst on form submission
- Implemented with CSS-only approach (spawn ~20 small divs with random trajectories)
- Auto-cleans up after animation completes

