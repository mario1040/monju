import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

const Hero = () => {
  const videoRef = useRef();
  // نستخدم Ref للوصول للصورة في الأنيميشن
  const logoRef = useRef(null);

  const isMobile = useMediaQuery({ maxWidth: 767 });

  useGSAP(() => {
    // 1. تقسيم النصوص (M و NJU)
    const heroSplit = new SplitText(".title-text", {
      type: "chars",
    });

    const paragraphSplit = new SplitText(".subtitle", {
      type: "lines",
    });

    // إضافة الكلاس للأحرف فقط
    heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));

    // 2. تجميع العناصر للأنيميشن (الحرف الأول + اللوجو + باقي الأحرف)
    // الترتيب: M -> Logo -> N -> J -> U
    const combinedAnimationTargets = [
      heroSplit.chars[0], // حرف M
      logoRef.current, // صورة اللوجو
      ...heroSplit.chars.slice(1), // أحرف NJU
    ];

    // 3. تطبيق الأنيميشن على المجموعة كاملة
    gsap.from(combinedAnimationTargets, {
      yPercent: 100,
      opacity: 0, // إضافة opacity لضمان اختفاء اللوجو في البداية
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
    });

    gsap.from(paragraphSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
      delay: 1,
    });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
      .to(".right-leaf", { y: 200 }, 0)
      .to(".left-leaf", { y: -200 }, 0)
      .to(".arrow", { y: 100 }, 0);

    const startValue = isMobile ? "top 50%" : "center 60%";
    const endValue = isMobile ? "120% top" : "bottom top";

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: "video",
        start: startValue,
        end: endValue,
        scrub: true,
        pin: true,
      },
    });

    videoRef.current.onloadedmetadata = () => {
      tl.to(videoRef.current, {
        currentTime: videoRef.current.duration,
      });
    };
  }, []);

  return (
    <>
      <section id="hero" className="noisy">
        {/* تم تعديل العنوان هنا */}
        <div className="title-wrapper flex items-center justify-center gap-[0.05em]">
          <h1 className="title-text title">M</h1>

          {/* صورة اللوجو بدلاً من حرف O */}
          <img
            ref={logoRef}
            src="public/images/image (1).png" // تم تصحيح الامتداد من pnh إلى png
            alt="Monju Logo"
            className="title-logo"
            // ملاحظة: قد تحتاج لضبط الـ style أدناه ليتناسب حجم اللوجو مع النص
            style={{
              // الارتفاع (Height)
              // clamp(للموبايل, التدرج, للديسكتوب)
              height: "clamp(7em, 20vw, 15em)",
              width: "auto",
              objectFit: "contain",
              display: "inline-block",

              // التعديل هنا (Transform):
              // بنقوله: لو فاتح من موبايل انزل مسافة كبيرة (مثلاً 0.6em)
              // ولو فاتح من ديسكتوب انزل مسافة صغيرة جداً (مثلاً 0.1em) عشان ميبقاش ساقط
              transform: isMobile ? "translateY(3.5em)" : "translateY(0.1em)",
            }}
          />

          <h1 className="title-text title">NJU</h1>
        </div>

        <img
          src="/images/hero-left-leaf.png"
          alt="left-leaf"
          className="left-leaf"
        />
        <img
          src="/images/hero-right-leaf.png"
          alt="right-leaf"
          className="right-leaf"
        />

        <div className="body">
          <div className="content">
            <div className="space-y-5 hidden md:block">
              <p>Cool. Crisp. Classic.</p>
              <p className="subtitle">
                Sip the Spirit <br /> of Summer
              </p>
            </div>

            <div className="view-cocktails">
              <p className="subtitle">
                Every cocktail on our menu is a blend of premium ingredients,
                creative flair, and timeless recipes — designed to delight your
                senses.
              </p>
              <a href="#cocktails">View cocktails</a>
            </div>
          </div>
        </div>
      </section>

      <div className="video absolute inset-0">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          src="/videos/output.mp4"
        />
      </div>
    </>
  );
};

export default Hero;
