import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import emailjs from '@emailjs/browser';

/* ─── Types ─────────────────────────────────────────── */
type Step = 'email' | 'subject' | 'desc' | 'done';
type Sender = 'bot' | 'user';

interface Message {
  id: number;
  text: string;
  sender: Sender;
  isHtml?: boolean;
}

/* ─── Constants ──────────────────────────────────────── */
const EMAILJS_SERVICE_ID  = 'service_a4al48j';
const EMAILJS_TEMPLATE_ID = 'template_dn71roa';
const EMAILJS_PUBLIC_KEY  = 'FYHi2SkbTASsX13mp';

const BAD_EMAIL_LINES = [
  "Hmm… that email tried its best and failed spectacularly. 🙈 Something like <strong>you@somewhere.com</strong> should do the trick!",
  "Error 404: Valid email not found. 🤖 Make sure there's an <strong>@</strong> hiding in there!",
  "My email detector just facepalmed. 🤦 Try the classic <strong>name@domain.com</strong> format?",
  "Almost! But that wouldn't survive a single SMTP handshake. 😅 Give it another shot!",
];

const OPENING_LINE =
  "Hey there! 👋 So glad you stopped by. Let's keep this quick — what's your <strong>email address</strong>? 📬";

const validateEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

let _id = 0;
const uid = () => ++_id;

/* ─── Sub-components ─────────────────────────────────── */
const TypingBubble: React.FC = () => (
  <div style={styles.msgRow('bot')}>
    <div style={styles.avatar}>DB</div>
    <div style={{ ...styles.bubble('bot'), padding: '12px 16px' }}>
      <div style={styles.typingDots}>
        {[0, 1, 2].map((i) => (
          <span key={i} style={{ ...styles.dot, animationDelay: `${i * 0.18}s` }} />
        ))}
      </div>
    </div>
  </div>
);

const BotBubble: React.FC<{ msg: Message }> = ({ msg }) => (
  <div style={styles.msgRow('bot')}>
    <div style={styles.avatar}>DB</div>
    {msg.isHtml ? (
      <div
        style={styles.bubble('bot')}
        dangerouslySetInnerHTML={{ __html: msg.text }}
      />
    ) : (
      <div style={styles.bubble('bot')}>{msg.text}</div>
    )}
  </div>
);

const UserBubble: React.FC<{ msg: Message }> = ({ msg }) => (
  <div style={styles.msgRow('user')}>
    <div style={styles.bubble('user')}>{msg.text}</div>
  </div>
);

const DoneBanner: React.FC<{
  email: string;
  subject: string;
  desc: string;
}> = ({ email, subject, desc }) => (
  <div style={styles.doneBanner}>
    <span style={{ fontSize: 20 }}>✅</span>
    <div style={{ textAlign: 'left' }}>
      <div style={{ fontWeight: 600, fontSize: 13 }}>{email}</div>
      <div style={{ fontSize: 12, opacity: 0.85, marginTop: 2 }}>{subject}</div>
      <div style={{ fontSize: 11, opacity: 0.65, marginTop: 2 }}>
        {desc.length > 90 ? desc.slice(0, 90) + '…' : desc}
      </div>
    </div>
  </div>
);

/* ─── Main Component ─────────────────────────────────── */
const ContactChat: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [typing, setTyping] = useState(false);
  const [step, setStep] = useState<Step>('email');
  const [inputVal, setInputVal] = useState('');
  const [badEmailCount, setBadEmailCount] = useState(0);
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [desc, setDesc] = useState('');
  const [showBanner, setShowBanner] = useState(false);

  const msgEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const appearedRef = useRef(false);

  /* Auto-scroll */
  useEffect(() => {
    msgEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing, showBanner]);

  /* ── Helpers ── */
  const addMessage = (text: string, sender: Sender, isHtml = false) => {
    setMessages((prev) => [...prev, { id: uid(), text, sender, isHtml }]);
  };

  const addBotMessage = (text: string, isHtml = false, delay = 900) => {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      addMessage(text, 'bot', isHtml);
    }, delay);
  };

  /* Open → greet once */
  useEffect(() => {
    if (open && !appearedRef.current) {
      appearedRef.current = true;
      addBotMessage(OPENING_LINE, true, 600);
    }
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  /* ── Send handler ── */
  const handleSend = () => {
    const val = inputVal.trim();
    if (!val || step === 'done') return;
    addMessage(val, 'user');
    setInputVal('');

    if (step === 'email') {
      if (!validateEmail(val)) {
        const line = BAD_EMAIL_LINES[badEmailCount % BAD_EMAIL_LINES.length];
        setBadEmailCount((c) => c + 1);
        addBotMessage(line, true);
      } else {
        setEmail(val);
        setStep('subject');
        addBotMessage(
          `Fantastic! <strong>${val}</strong> looks legit. ✅ Now — what's this about? Give me a short subject line. Think tweet, but less chaotic. 😄`,
          true
        );
      }
    } else if (step === 'subject') {
      setSubject(val);
      setStep('desc');
      addBotMessage(
        `Ooh, <em>"${val}"</em> — I'm intrigued! 🧐 Now spill the details. Write as much or as little as you'd like:`,
        true
      );
    } else if (step === 'desc') {
      setDesc(val);
      setStep('done');
      addBotMessage('Let me package all of this up and fire it to the inbox… 📦', false, 700);
      
      const templateParams = {
        from_email: email,   
        subject: subject,
        message: val,
        reply_to: email,
      };

      emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)
        .then(() => {
          setTimeout(() => {
            setTyping(true);
            setTimeout(() => {
              setTyping(false);
              addMessage("Here's a summary of what I'm sending:", 'bot');
              setTimeout(() => setShowBanner(true), 300);
              setTimeout(
                () =>
                  addBotMessage(
                    "Done! 🎉 I'll resurface from my code cave ASAP. Thanks for reaching out — you're awesome! 🙌",
                    false,
                    800
                  ),
                900
              );
            }, 1200);
          }, 1800);
          return undefined;
        })
        .catch((error: unknown) => {
          console.error('FAILED...', error);
          addBotMessage("Oops! Something went wrong sending the email. 😥 Please try again later.", false, 1500);
        });
    }
  };

  const stepLabels: Record<Step, string> = {
    email: 'step 1 of 3 — email',
    subject: 'step 2 of 3 — subject',
    desc: 'step 3 of 3 — description',
    done: '✓ all done!',
  };

  const isDone = step === 'done';

  /* ─── Render ─────────────────────────────────────────── */
  return (
    <>
      {/* Inject keyframe animations */}
      <style>{`
        @keyframes chatSlideUp {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes dotBounce {
          0%, 80%, 100% { transform: translateY(0); }
          40%            { transform: translateY(-5px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .cc-msg-enter { animation: fadeIn 0.22s ease both; }
        .cc-input:focus { outline: none; border-color: #ff6b35 !important; }
        .cc-send:hover  { background: #e55a26 !important; }
        .cc-send:active { transform: scale(0.92) !important; }
        .cc-close:hover { color: #fff !important; }
        .cc-trigger:hover { background: rgba(255,255,255,0.12) !important; }
      `}</style>

      {/* Trigger button — styled to match ModelViewer */}
      <button
        onClick={() => setOpen((o) => !o)}
        style={styles.triggerBtn}
        className="cc-trigger"
      >
        Contact Me
      </button>

      {/* Chat window */}
      {open && createPortal(
        <div style={styles.chatWindow}>
          {/* Header */}
          <div style={styles.header}>
            <div style={styles.headerAvatar}>DB</div>
            <div>
              <div style={styles.headerName}>Dhakshina's Mail Bot</div>
              <div style={styles.headerSub}>Developer · Usually replies fast</div>
            </div>
            <div style={styles.onlineDot} />
            <button
              onClick={() => setOpen(false)}
              style={styles.closeBtn}
              className="cc-close"
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div style={styles.msgWrap}>
            {messages.map((m) =>
              m.sender === 'bot' ? (
                <div key={m.id} className="cc-msg-enter">
                  <BotBubble msg={m} />
                </div>
              ) : (
                <div key={m.id} className="cc-msg-enter">
                  <UserBubble msg={m} />
                </div>
              )
            )}
            {showBanner && (
              <div className="cc-msg-enter">
                <DoneBanner email={email} subject={subject} desc={desc} />
              </div>
            )}
            {typing && <TypingBubble />}
            <div ref={msgEndRef} />
          </div>

          {/* Step indicator */}
          <div style={styles.stepLabel}>{stepLabels[step]}</div>

          {/* Input */}
          <div style={styles.inputArea}>
            <input
              ref={inputRef}
              className="cc-input"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={isDone ? 'Message sent! 🎉' : 'Type here…'}
              disabled={isDone}
              style={styles.input(isDone)}
            />
            <button
              onClick={handleSend}
              disabled={isDone || !inputVal.trim()}
              className="cc-send"
              style={styles.sendBtn(isDone || !inputVal.trim())}
              aria-label="Send"
            >
              ➤
            </button>
          </div>
        </div>
      , document.body)}
    </>
  );
};

/* ─── Styles ─────────────────────────────────────────── */
const styles = {
  triggerBtn: {
    position: 'absolute' as const,
    top: 16,
    right: 16,
    zIndex: 10,
    padding: '8px 20px',
    background: 'transparent',
    color: '#ffffff',
    border: '1.5px solid rgba(255,255,255,0.7)',
    borderRadius: 9999,
    fontSize: 13,
    fontWeight: 500,
    cursor: 'pointer',
    letterSpacing: '0.01em',
    backdropFilter: 'blur(4px)',
    transition: 'background 0.2s, border-color 0.2s',
    whiteSpace: 'nowrap' as const,
  },

  chatWindow: {
    position: 'fixed' as const,
    bottom: 16,
    right: 16,
    zIndex: 9999,
    width: 360,
    maxWidth: 'calc(100% - 32px)',
    background: '#1a1a1e',
    borderRadius: 16,
    border: '1px solid rgba(255,255,255,0.08)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column' as const,
    maxHeight: 500,
    boxShadow: '0 8px 40px rgba(0,0,0,0.45)',
    animation: 'chatSlideUp 0.28s cubic-bezier(0.22,1,0.36,1) both',
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  },

  header: {
    padding: '12px 16px',
    background: '#111114',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    flexShrink: 0,
  },

  headerAvatar: {
    width: 34, height: 34, borderRadius: '50%',
    background: '#ff6b35',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontWeight: 600, fontSize: 12, color: '#fff', flexShrink: 0,
  },

  headerName: { fontSize: 13, fontWeight: 600, color: '#fff', margin: 0 },
  headerSub:  { fontSize: 10, color: 'rgba(255,255,255,0.4)', marginTop: 1 },

  onlineDot: {
    width: 8, height: 8, borderRadius: '50%',
    background: '#4ade80', flexShrink: 0,
  },

  closeBtn: {
    marginLeft: 'auto',
    background: 'none', border: 'none',
    color: 'rgba(255,255,255,0.4)',
    cursor: 'pointer', fontSize: 14, lineHeight: 1,
    padding: '4px 6px', borderRadius: 6,
    transition: 'color 0.15s',
  },

  msgWrap: {
    flex: 1, overflowY: 'auto' as const,
    padding: '14px 14px 6px',
    display: 'flex', flexDirection: 'column' as const, gap: 8,
    minHeight: 220, maxHeight: 340,
    scrollBehavior: 'smooth' as const,
  },

  msgRow: (sender: Sender): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'flex-end',
    gap: 6,
    justifyContent: sender === 'user' ? 'flex-end' : 'flex-start',
  }),

  avatar: {
    width: 26, height: 26, borderRadius: '50%',
    background: '#ff6b35',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 9, fontWeight: 600, color: '#fff', flexShrink: 0,
  },

  bubble: (sender: Sender): React.CSSProperties => ({
    padding: '9px 13px',
    borderRadius: sender === 'bot' ? '16px 16px 16px 4px' : '16px 16px 4px 16px',
    fontSize: 13, lineHeight: 1.55, maxWidth: '80%',
    background: sender === 'bot' ? 'rgba(255,255,255,0.07)' : '#ff6b35',
    color: sender === 'bot' ? 'rgba(255,255,255,0.88)' : '#fff',
  }),

  typingDots: {
    display: 'flex', gap: 4, alignItems: 'center',
  },

  dot: {
    width: 6, height: 6, borderRadius: '50%',
    background: 'rgba(255,255,255,0.4)',
    display: 'inline-block',
    animation: 'dotBounce 1.2s infinite',
  } as React.CSSProperties,

  doneBanner: {
    background: 'rgba(74,222,128,0.1)',
    border: '1px solid rgba(74,222,128,0.2)',
    borderRadius: 10,
    padding: '10px 14px',
    margin: '4px 0',
    fontSize: 12, color: '#4ade80',
    display: 'flex', alignItems: 'flex-start', gap: 10,
  },

  stepLabel: {
    textAlign: 'center' as const,
    fontSize: 10,
    color: 'rgba(255,255,255,0.25)',
    padding: '4px 0 8px',
    letterSpacing: '0.06em',
    flexShrink: 0,
  },

  inputArea: {
    padding: '10px 12px',
    borderTop: '1px solid rgba(255,255,255,0.06)',
    display: 'flex', alignItems: 'center', gap: 8,
    background: '#111114', flexShrink: 0,
  },

  input: (disabled: boolean): React.CSSProperties => ({
    flex: 1,
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 9999,
    padding: '8px 14px',
    fontSize: 13,
    background: disabled ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.06)',
    color: disabled ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.88)',
    transition: 'border-color 0.2s',
    fontFamily: 'inherit',
  }),

  sendBtn: (disabled: boolean): React.CSSProperties => ({
    width: 34, height: 34, borderRadius: '50%',
    background: disabled ? 'rgba(255,255,255,0.06)' : '#ff6b35',
    border: 'none', cursor: disabled ? 'default' : 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: disabled ? 'rgba(255,255,255,0.2)' : '#fff',
    flexShrink: 0,
    fontSize: 13,
    transition: 'background 0.2s, transform 0.1s',
  }),
};

export default ContactChat;