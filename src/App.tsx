import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Sparkles,
  MessageCircleHeart,
  RotateCcw,
  Moon,
  Send,
  Ghost,
  MessageSquare,
  ChevronRight,
  Volume2,
  VolumeX,
} from "lucide-react";

const chapters = [
  {
    title: "hey bish",
    tag: "from aevy",
    icon: Send,
    text: "i made you this because saying everything normally felt weird, and doing nothing felt worse.",
    extra:
      "so yeah. click through it and pretend i’m cool for like 5 minutes 😭",
  },
  {
    title: "rip instagram era",
    tag: "discord / whatsapp / tiktok now ig",
    icon: Ghost,
    text: "still cant believe your insta got banned and our chats just disappeared like that 💀",
    extra:
      "we still talk on Discord, WhatsApp, and TikTok, but yeah... insta had its own vibe.",
  },
  {
    title: "about what i said",
    tag: "the dumb part",
    icon: Moon,
    text: "when i said i moved on, i don’t think i said it because i stopped caring.",
    extra:
      "i think i said it because i was hurt, confused, and trying to act like i was fine when i really wasn’t.",
  },
  {
    title: "the truth is",
    tag: "no excuses",
    icon: MessageCircleHeart,
    text: "i started talking to other people and i was rude to you too. that was on me.",
    extra:
      "but none of that changed the fact that i still cared about you. i was just being stupid with my feelings.",
  },
  {
    title: "what i want now",
    tag: "not the same mistake twice",
    icon: Sparkles,
    text: "i don’t want us to lose each other because of a misunderstanding.",
    extra:
      "if something goes wrong, i want us to talk properly. even if it’s uncomfortable. even if it takes time. i want us to fix things instead of guessing and hurting each other.",
  },
];

const instaMessages = [
  "message unavailable",
  "message unavailable",
  "message unavailable",
  "but the feeling is still here",
  "and i still choose you",
];

const revealLines = [
  "i said i moved on.",
  "i acted like i didn’t care.",
  "i was rude when i should’ve been honest.",
  "but i never wanted us to become strangers.",
  "i still love you, Shreya.",
];

const lilacImage = "/mnt/data/9e313b1d-cddd-4d24-b3e0-89d0fc4c1bbf.png";

const colors = [
  {
    name: "black",
    className: "bg-[#050505] border border-white/15",
    heart: "text-white",
  },
  { name: "white", className: "bg-[#f8f6f2]", heart: "text-black" },
  { name: "lavender", className: "bg-[#d8b4fe]", heart: "text-white" },
  { name: "baby pink", className: "bg-[#f9a8d4]", heart: "text-white" },
  { name: "lilac flowers", className: "bg-[#c8a2c8]", heart: "text-white" },
];

function LilacBranch({ className = "" }) {
  const blooms = [
    [20, 18],
    [34, 12],
    [48, 20],
    [30, 32],
    [48, 38],
    [64, 30],
    [42, 52],
    [62, 56],
    [78, 46],
    [58, 74],
    [78, 76],
    [92, 64],
  ];

  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <path
        d="M18 102 C38 78, 58 56, 98 18"
        stroke="#6b5b75"
        strokeWidth="3"
        fill="none"
        opacity="0.55"
      />
      <path
        d="M42 72 C30 67, 22 58, 18 48"
        stroke="#7a6a85"
        strokeWidth="2"
        fill="none"
        opacity="0.35"
      />
      <path
        d="M62 54 C78 50, 88 42, 96 30"
        stroke="#7a6a85"
        strokeWidth="2"
        fill="none"
        opacity="0.35"
      />
      {blooms.map(([x, y], index) => (
        <g key={index} opacity="0.92">
          <circle cx={x} cy={y - 3} r="4" fill="#d8b4fe" />
          <circle cx={x + 3} cy={y} r="4" fill="#c8a2c8" />
          <circle cx={x} cy={y + 3} r="4" fill="#e9d5ff" />
          <circle cx={x - 3} cy={y} r="4" fill="#d8b4fe" />
          <circle cx={x} cy={y} r="1.5" fill="#fff7ed" opacity="0.8" />
        </g>
      ))}
    </svg>
  );
}

function Typewriter({ text, className = "" }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    setDisplayed("");
    let index = 0;

    const interval = setInterval(() => {
      setDisplayed(text.slice(0, index + 1));
      index += 1;
      if (index >= text.length) clearInterval(interval);
    }, 22);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <p className={className}>
      {displayed}
      <span className="text-[#f9a8d4]">|</span>
    </p>
  );
}

function runSanityChecks() {
  const failures = [];

  if (chapters.length < 1) failures.push("chapters should not be empty");
  if (instaMessages.length < 2)
    failures.push("instaMessages should have at least 2 messages");
  if (revealLines.length < 1) failures.push("revealLines should not be empty");
  if (colors.length < 4) failures.push("colors should have at least 4 items");

  chapters.forEach((chapter, index) => {
    if (!chapter.title || !chapter.text || !chapter.extra || !chapter.icon) {
      failures.push(`chapter ${index + 1} is missing required fields`);
    }
  });

  colors.forEach((color, index) => {
    if (!color.name || !color.className || !color.heart) {
      failures.push(`color ${index + 1} is missing required fields`);
    }
  });

  return failures;
}

export default function LongDistanceGift() {
  const musicUrl = "https://files.catbox.moe/mcll8s.mp3";
  const songStartTime = 88;

  const [chapter, setChapter] = useState(0);
  const [mode, setMode] = useState("story");
  const [chatStep, setChatStep] = useState(0);
  const [truthStep, setTruthStep] = useState(0);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [secretFound, setSecretFound] = useState(false);
  const [answers, setAnswers] = useState({
    hurt: "",
    stay: "",
    repeat: "",
  });
  const [submitStatus, setSubmitStatus] = useState("idle");

  const formEndpoint = "https://formspree.io/f/mkoeovdw";
  const audioRef = useRef(null);
  const testFailures = useMemo(() => runSanityChecks(), []);
  const CurrentIcon = chapters[chapter].icon;

  const deepQuestions = [
    {
      key: "hurt",
      question:
        "through these 10 months and 6 months 24 days of our online marriage… what hurt you the most?",
    },
    {
      key: "stay",
      question: "what made you stay even after everything?",
    },
    {
      key: "repeat",
      question: "what’s one thing you never want us to repeat again?",
    },
  ];

  const navItems = [
    ["story", "home"],
    ["lost", "lost insta"],
    ["truth", "what i should’ve said"],
    ["colors", "tiny details"],
    ["questions", "questions"],
    ["end", "the end"],
  ];

  const reset = () => {
    setChapter(0);
    setMode("story");
    setChatStep(0);
    setTruthStep(0);
    setSecretFound(false);
  };

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    try {
      if (musicPlaying) {
        audioRef.current.pause();
        setMusicPlaying(false);
      } else {
        audioRef.current.currentTime = songStartTime;
        await audioRef.current.play();
        setMusicPlaying(true);
      }
    } catch (error) {
      alert(
        "The music link is not working yet. Make sure it is a direct .mp3 link."
      );
    }
  };

  const submitAnswers = async () => {
    setSubmitStatus("sending");

    try {
      const response = await fetch(formEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          hurt: answers.hurt,
          stay: answers.stay,
          repeat: answers.repeat,
          sentFrom: "Shreya gift website",
        }),
      });

      if (!response.ok) throw new Error("Formspree request failed");
      setSubmitStatus("sent");
    } catch (error) {
      setSubmitStatus("error");
    }
  };

  if (testFailures.length > 0) {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <h1 className="text-2xl font-bold mb-4">Something needs fixing</h1>
        <ul className="list-disc pl-6 space-y-2 text-red-200">
          {testFailures.map((failure) => (
            <li key={failure}>{failure}</li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden font-['Times_New_Roman','Georgia',serif]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_15%,#f9a8d42a,transparent_28%),radial-gradient(circle_at_40%_80%,#d8b4fe22,transparent_28%),radial-gradient(circle_at_20%_40%,#ffffff10,transparent_24%)]" />

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.img
          src={lilacImage}
          alt=""
          className="absolute right-[-70px] top-[-40px] w-[320px] md:w-[520px] rounded-full opacity-[0.38] blur-0 mix-blend-lighten"
          animate={{ y: [0, 18, 0], rotate: [0, 2, 0], scale: [1, 1.03, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.img
          src={lilacImage}
          alt=""
          className="absolute left-[-90px] bottom-[-80px] w-[280px] md:w-[430px] rounded-full opacity-[0.26] blur-[0.5px] mix-blend-lighten"
          animate={{ y: [0, -16, 0], rotate: [0, -3, 0], scale: [1, 1.04, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <LilacBranch className="absolute -right-6 top-16 w-48 md:w-72 opacity-35 rotate-12" />
        <LilacBranch className="absolute -left-10 bottom-10 w-44 md:w-64 opacity-20 -rotate-[28deg]" />

        {Array.from({ length: 16 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute block rounded-full bg-[#d8b4fe]/35 blur-[0.3px]"
            style={{ width: 7 + (i % 4) * 2, height: 5 + (i % 3) * 2 }}
            initial={{
              y: "105vh",
              x: `${(i * 19) % 100}vw`,
              opacity: 0,
              rotate: 0,
            }}
            animate={{
              y: "-10vh",
              opacity: [0, 0.6, 0],
              rotate: [0, 120, 240],
            }}
            transition={{
              duration: 12 + (i % 5),
              repeat: Infinity,
              delay: i * 0.55,
            }}
          />
        ))}
      </div>

      <div className="relative min-h-screen grid md:grid-cols-[260px_1fr]">
        <audio ref={audioRef} loop preload="auto">
          <source src={musicUrl} type="audio/mpeg" />
        </audio>

        <button
          onClick={toggleMusic}
          className="fixed bottom-5 right-5 z-50 px-4 py-3 rounded-full bg-white text-black hover:bg-[#fbcfe8] transition shadow-2xl flex items-center gap-2"
        >
          {musicPlaying ? <VolumeX size={18} /> : <Volume2 size={18} />}
          {musicPlaying ? "pause music" : "play music"}
        </button>

        <aside className="hidden md:flex border-r border-white/10 p-8 flex-col justify-between bg-[#0a0a0a]/60 backdrop-blur-sm">
          <div>
            <button
              onClick={reset}
              className="text-3xl tracking-[0.08em] mb-24 text-left font-light"
            >
              for shreya <span className="text-[#f9a8d4]">♡</span>
            </button>

            <nav className="space-y-5">
              {navItems.map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setMode(key)}
                  className={`w-full text-left px-5 py-3 rounded-2xl transition tracking-[0.06em] ${
                    mode === key
                      ? "bg-gradient-to-r from-[#f9a8d422] to-[#d8b4fe22] text-white"
                      : "text-white/75 hover:bg-[#ffffff10]"
                  }`}
                >
                  <span>{label}</span>
                  {mode === key && (
                    <span className="float-right text-[#f9a8d4]">●</span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          <p className="text-sm text-white/50 leading-relaxed">
            made with way too
            <br />
            much overthinking <span className="text-[#f9a8d4]">♡</span>
          </p>
        </aside>

        <main className="relative min-h-screen p-5 md:p-14 flex items-center">
          <div className="md:hidden mb-4 fixed top-4 left-4 right-4 z-20 flex gap-2 overflow-x-auto rounded-2xl bg-black/70 backdrop-blur-md border border-white/10 p-2">
            {navItems.map(([key, label]) => (
              <button
                key={key}
                onClick={() => setMode(key)}
                className={`shrink-0 px-4 py-2 rounded-xl text-sm ${
                  mode === key
                    ? "bg-white text-black"
                    : "bg-gradient-to-r from-[#f9a8d422] to-[#d8b4fe22] text-white"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="w-full max-w-6xl mx-auto pt-20 md:pt-0">
            <AnimatePresence mode="wait">
              {mode === "story" && (
                <motion.section
                  key={`story-${chapter}`}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.35 }}
                  className="max-w-3xl"
                >
                  <div className="flex items-center gap-3 mb-6 text-[#d8b4fe] drop-shadow-[0_0_8px_rgba(216,180,254,0.35)] tracking-[0.14em] text-sm">
                    <CurrentIcon size={18} />
                    <span>{chapters[chapter].tag}</span>
                  </div>

                  <h1 className="text-5xl md:text-7xl font-light tracking-[0.02em] mb-8 leading-tight">
                    {chapters[chapter].title}{" "}
                    <span className="text-[#f9a8d4]">♡</span>
                  </h1>

                  <div className="h-px w-16 bg-[#d8b4fe] mb-10" />

                  <div className="space-y-5 text-white/82 tracking-wide leading-relaxed max-w-2xl">
                    <Typewriter
                      text={chapters[chapter].text}
                      className="text-xl md:text-2xl leading-relaxed font-light"
                    />
                    <p className="text-base md:text-lg text-white/58 leading-relaxed">
                      {chapters[chapter].extra}
                    </p>

                    {chapter === 0 && (
                      <button
                        onClick={() => setSecretFound(true)}
                        className="mt-4 text-[#f9a8d4]/60 hover:text-[#f9a8d4] transition text-sm"
                      >
                        tiny secret ♡
                      </button>
                    )}

                    {secretFound && chapter === 0 && (
                      <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[#d8b4fe] text-sm"
                      >
                        you found it btw. i still adore you idiot.
                      </motion.p>
                    )}
                  </div>

                  <div className="flex gap-3 mt-12">
                    {chapter > 0 && (
                      <button
                        onClick={() => setChapter(chapter - 1)}
                        className="px-5 py-3 rounded-full border border-white/15 hover:bg-white/10 transition"
                      >
                        back
                      </button>
                    )}
                    <button
                      onClick={() =>
                        chapter === chapters.length - 1
                          ? setMode("lost")
                          : setChapter(chapter + 1)
                      }
                      className="px-6 py-3 rounded-full bg-white text-black hover:bg-[#fbcfe8] transition inline-flex items-center gap-2"
                    >
                      {chapter === chapters.length - 1 ? "next part" : "next"}{" "}
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </motion.section>
              )}

              {mode === "lost" && (
                <motion.section
                  key="lost"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.35 }}
                  className="max-w-3xl"
                >
                  <p className="text-[#d8b4fe] drop-shadow-[0_0_8px_rgba(216,180,254,0.35)] tracking-[0.14em] text-sm mb-6">
                    lost insta
                  </p>
                  <h1 className="text-5xl md:text-7xl font-light tracking-[0.02em] mb-8 leading-tight">
                    our lost chat <span className="text-[#f9a8d4]">♡</span>
                  </h1>
                  <div className="h-px w-16 bg-[#d8b4fe] mb-10" />
                  <p className="text-white/60 mb-8 tracking-wide">
                    press the button and watch insta be useless again.
                  </p>

                  <div className="max-w-xl rounded-[1.7rem] bg-gradient-to-br from-[#ffffff08] to-[#d8b4fe08] border border-white/10 p-4 text-left space-y-3 min-h-72 shadow-2xl">
                    {instaMessages.slice(0, chatStep + 1).map((msg, i) => (
                      <motion.div
                        key={`${msg}-${i}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                          i % 2 === 0
                            ? "bg-gradient-to-r from-[#f9a8d422] to-[#d8b4fe22] text-white/55"
                            : "bg-pink-100 text-black ml-auto"
                        }`}
                      >
                        {msg}
                      </motion.div>
                    ))}
                  </div>

                  <button
                    onClick={() =>
                      chatStep < instaMessages.length - 1
                        ? setChatStep(chatStep + 1)
                        : setMode("truth")
                    }
                    className="mt-8 px-6 py-3 rounded-full bg-white text-black hover:bg-[#fbcfe8] transition"
                  >
                    {chatStep < instaMessages.length - 1
                      ? "recover next message"
                      : "continue"}
                  </button>
                </motion.section>
              )}

              {mode === "truth" && (
                <motion.section
                  key="truth"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.35 }}
                  className="max-w-4xl"
                >
                  <p className="text-[#d8b4fe] drop-shadow-[0_0_8px_rgba(216,180,254,0.35)] tracking-[0.14em] text-sm mb-6">
                    the truth
                  </p>
                  <h1 className="text-5xl md:text-7xl font-light tracking-[0.02em] mb-8 leading-tight">
                    what i should’ve said
                  </h1>
                  <div className="h-px w-16 bg-[#d8b4fe] mb-10" />

                  <div className="min-h-48 flex items-center rounded-[1.7rem] bg-gradient-to-br from-[#ffffff08] to-[#d8b4fe08] border border-white/10 p-8 mb-7">
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={truthStep}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        className="text-3xl md:text-5xl font-light text-white leading-snug"
                      >
                        {revealLines[truthStep]}
                      </motion.p>
                    </AnimatePresence>
                  </div>

                  <button
                    onClick={() =>
                      truthStep < revealLines.length - 1
                        ? setTruthStep(truthStep + 1)
                        : setMode("colors")
                    }
                    className="px-6 py-3 rounded-full bg-white text-black hover:bg-[#fbcfe8] transition"
                  >
                    {truthStep < revealLines.length - 1
                      ? "next truth"
                      : "tiny details"}
                  </button>
                </motion.section>
              )}

              {mode === "colors" && (
                <motion.section
                  key="colors"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.35 }}
                  className="w-full"
                >
                  <p className="text-[#d8b4fe] drop-shadow-[0_0_8px_rgba(216,180,254,0.35)] tracking-[0.14em] text-sm mb-6">
                    tiny details
                  </p>
                  <h1 className="text-5xl md:text-7xl font-light tracking-[0.02em] mb-8 leading-tight">
                    colors <span className="text-[#f9a8d4]">♡</span>
                  </h1>
                  <div className="h-px w-16 bg-[#d8b4fe] mb-10" />
                  <p className="text-white/70 tracking-[0.06em] mb-14">
                    idk if you realized already but i literally made this whole
                    website using your favorite colors 😭 black, white, lavender
                    and baby pink just remind me of you now. and yeah, i added
                    lilacs too because you’ve been liking them recently.
                  </p>

                  <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
                    {colors.map((color) => (
                      <div key={color.name} className="text-center">
                        <div
                          className={`aspect-[3/4] rounded-2xl ${color.className} shadow-2xl flex items-center justify-center`}
                        >
                          {color.name === "lilac flowers" ? (
                            <LilacBranch className="w-24 opacity-95" />
                          ) : (
                            <Heart
                              className={color.heart}
                              size={34}
                              strokeWidth={1.6}
                            />
                          )}
                        </div>
                        <p className="mt-5 text-xl tracking-[0.08em] text-white/85">
                          {color.name}
                        </p>
                      </div>
                    ))}
                  </div>

                  <p className="text-center text-[#d8b4fe] drop-shadow-[0_0_8px_rgba(216,180,254,0.35)] tracking-[0.05em] mt-16">
                    soft. simple. lilac-coded. basically you.
                  </p>

                  <div className="text-center mt-8">
                    <button
                      onClick={() => setMode("questions")}
                      className="px-6 py-3 rounded-full bg-white text-black hover:bg-[#fbcfe8] transition"
                    >
                      questions
                    </button>
                  </div>
                </motion.section>
              )}

              {mode === "questions" && (
                <motion.section
                  key="questions"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.35 }}
                  className="max-w-4xl w-full"
                >
                  <p className="text-[#d8b4fe] drop-shadow-[0_0_8px_rgba(216,180,254,0.35)] tracking-[0.14em] text-sm mb-6">
                    questions
                  </p>

                  <h1 className="text-5xl md:text-7xl font-light tracking-[0.02em] mb-8 leading-tight">
                    before you leave
                  </h1>

                  <div className="h-px w-16 bg-[#d8b4fe] mb-10" />

                  <div className="space-y-8">
                    {deepQuestions.map((item) => (
                      <div
                        key={item.key}
                        className="rounded-[1.7rem] bg-gradient-to-br from-[#ffffff08] to-[#d8b4fe08] border border-white/10 p-6"
                      >
                        <p className="text-white/90 text-lg md:text-xl mb-4 leading-relaxed font-light">
                          {item.question}
                        </p>

                        <textarea
                          value={answers[item.key]}
                          onChange={(e) =>
                            setAnswers((prev) => ({
                              ...prev,
                              [item.key]: e.target.value,
                            }))
                          }
                          placeholder="write here..."
                          className="w-full min-h-[120px] rounded-2xl bg-black/30 border border-white/10 p-4 text-white placeholder:text-white/30 outline-none focus:border-[#f9a8d4]/50 resize-none"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="mt-10 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={submitAnswers}
                      disabled={submitStatus === "sending"}
                      className="px-6 py-3 rounded-full bg-white text-black hover:bg-[#fbcfe8] transition disabled:opacity-60"
                    >
                      {submitStatus === "sending"
                        ? "sending..."
                        : submitStatus === "sent"
                        ? "sent to aevy ♡"
                        : "send answers"}
                    </button>

                    <button
                      onClick={() => setMode("end")}
                      className="px-6 py-3 rounded-full border border-white/15 hover:bg-white/10 transition"
                    >
                      final message
                    </button>
                  </div>

                  {submitStatus === "error" && (
                    <p className="mt-4 text-[#f9a8d4]">
                      it didn’t send. check the formspree link or try again.
                    </p>
                  )}

                  {submitStatus === "sent" && (
                    <p className="mt-4 text-[#d8b4fe]">
                      answers sent. now go finish the website idiot ♡
                    </p>
                  )}
                </motion.section>
              )}

              {mode === "end" && (
                <motion.section
                  key="end"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.35 }}
                  className="max-w-3xl"
                >
                  <p className="text-[#d8b4fe] drop-shadow-[0_0_8px_rgba(216,180,254,0.35)] tracking-[0.14em] text-sm mb-6">
                    the end
                  </p>
                  <h1 className="text-5xl md:text-7xl font-light tracking-[0.02em] mb-8 leading-tight">
                    for you
                  </h1>
                  <div className="h-px w-16 bg-[#d8b4fe] mb-10" />

                  <div className="rounded-[1.7rem] bg-gradient-to-br from-[#ffffff08] to-[#d8b4fe08] border border-white/10 p-8 text-white/78 leading-relaxed tracking-wide text-lg relative overflow-hidden">
                    <LilacBranch className="absolute -right-8 -top-8 w-40 opacity-20" />
                    <p>
                      Shreya, i know i said i moved on, but i was being dumb. i
                      still care, i still love you, and i don’t want us to lose
                      each other over misunderstandings. i want us to
                      communicate, fix things, and stay together properly even
                      if your insta got banned and now our chats have to survive
                      on Discord, WhatsApp, and TikTok.
                    </p>
                  </div>

                  <button
                    onClick={reset}
                    className="mt-8 inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/15 hover:bg-white/10 transition"
                  >
                    <RotateCcw size={18} /> replay
                  </button>
                </motion.section>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
