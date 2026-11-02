import type { InvitationConfig } from "@/types/invitation";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  EDIT THIS FILE — NOT THE COMPONENTS
 * ─────────────────────────────────────────────────────────────────────────────
 * All names, dates, venues, photographs, and links below are realistic
 * placeholders. Replace them with the family's details before publishing.
 * 
 * Checklist before launch:
 *  • [ ] Baby, parents, and godparents' names
 *  • [ ] Ceremony date/time and both venue addresses + Google Maps links
 *  • [ ] Portrait and gallery photographs (with meaningful alt text)
 *  • [ ] RSVP Google Form URL (and remove the REPLACE marker)
 *  • [ ] Music file, credits, and volume
 *  • [ ] Public site URL used by the QR code and social metadata
 */
export const invitation = {
  meta: {
    title: "Adreil Eiden B. Vacal | A Christening Invitation",
    description:
      "With joyful hearts, we invite you to celebrate the christening of Adreil Eiden B. Vacal — a little blessing, a lifetime of grace.",
    ogImage: "/images/denden.png",
    indexable: true,
  },

  baby: {
    fullName: "Adreil Eiden B. Vacal",
    firstName: "Adreil Eiden",
    displayNameLines: ["Adreil Eiden", "Vacal"],
    monogram: "AE",
  },

  parents: {
    mother: "Eileen Denise Vacal",
    father: "Aldrin Vacal",
  },

  envelope: {
    eyebrow: "Together with joy",
    title: "A Little Blessing",
    subtitle: "You are warmly invited to the christening of",
    openLabel: "A Glimpse of Adreil",
    note: "Tap to open",
    sealMonogram: "AE",
  },

  hero: {
    eyebrow: "A Christening Celebration",
    announcement:
      "With grateful hearts, we invite you to share in a day of faith, family, and new beginnings.",
    parentsLabel: "Beloved son of",
    blessing: "A little blessing, a lifetime of grace.",
    portraitCaption: "Our little blessing",
  },

  event: {
    startsAt: "2027-01-03T14:00:00+08:00",
    endsAt: "2027-01-03T17:00:00+08:00",
    timeZone: "Asia/Manila",
    ceremonyTimeLabel: "02:00 in the afternoon",
    receptionTimeLabel: "3:00 afternoon",
    church: {
      name: "Our Lady of Lourdes Parish",
      image: "/images/our-lady-of-lourdes-parish.jpeg",
      addressLines: ["123 Cathedral Lane", "Quezon City, Metro Manila 1100"],
      mapsUrl:
        "https://www.google.com/maps/place/Our+Lady+Of+Lourdes+Parish/@11.202924,124.9983004,16z/data=!4m10!1m2!2m1!1sour+lady+of+lourdes+parish+vng!3m6!1s0x33087703c48bd975:0x903d8871f8c6a23d!8m2!3d11.206525!4d124.9991567!15sCh5vdXIgbGFkeSBvZiBsb3VyZGVzIHBhcmlzaCB2bmdaICIeb3VyIGxhZHkgb2YgbG91cmRlcyBwYXJpc2ggdm5nkgEPY2F0aG9saWNfY2h1cmNomgEkQ2hkRFNVaE5NRzluUzBWSlEwRm5TVU5TYVRkRWNXbG5SUkFC4AEA-gEECAAQFA!16s%2Fg%2F1tk6y04l?entry=ttu&g_ep=EgoyMDI2MTAyOC4wIKXMDSoASAFQAw%3D%3D",
      description: "Holy Mass at Our Lady of Lourdes Parish, followed by a garden reception at The Garden Room at Casa Verde.",
    },
    reception: {
      name: "Zacky's Events Place",
      image: "/images/zp-logo.jpg",
      addressLines: ["88 Acacia Avenue", "Quezon City, Metro Manila 1112"],
      mapsUrl:
        "https://www.google.com/maps/place/Zacky%E2%80%99s+Event+Place/@11.2081905,124.9951703,17z/data=!4m14!1m7!3m6!1s0x330877003b517203:0x206d7aa8efce2c64!2sZacky%E2%80%99s+Event+Place!8m2!3d11.2081905!4d124.9977452!16s%2Fg%2F11wfx0n_20!3m5!1s0x330877003b517203:0x206d7aa8efce2c64!8m2!3d11.2081905!4d124.9977452!16s%2Fg%2F11wfx0n_20?entry=ttu&g_ep=EgoyMDI2MTAyOC4wIKXMDSoASAFQAw%3D%3D",
      description: "Garden reception celebrating the christening of Adreil Eiden.",
    },
    ceremony: {
      name: "Our Lady of Lourdes Parish",
      addressLines: ["Address to Be Announced"],
      time: "02:00 in the afternoon",
      image: "/images/our-lady-of-lourdes-parish.jpeg",
      mapsUrl: "",
    },
    // reception: {
    //   name: "Zacky's Events Place",
    //   addressLines: ["Address to Be Announced"],
    //   time: "3:00 pm in the afternoon",
    //   image: "/images/venue-placeholder.jpg",
    //   mapsUrl: "",
    // },
    calendarTitle: "Christening of Adreil Eiden B. Vacal",
    calendarDescription:
      "Holy Mass at Our Lady of Lourdes Parish, followed by a garden reception at The Garden Room at Casa Verde. Please join us as we welcome Adreil Eiden into the Christian faith.",
  },

  invitationMessage:
    "With joyful hearts, we welcome our son into the Christian faith and give thanks for the gift of his life.",

  verse: {
    text: "Let the little children come to me, and do not hinder them, for the kingdom of heaven belongs to such as these.",
    reference: "Matthew 19:14",
  },

  godparents: {
    intro:
      "With grateful hearts, we honor the family and friends who will walk with our son in faith.",
    ninongs: [
      {
        name: "Julius Cesar Nadores",
        // Sample note — replace or remove before sharing personalized links.
        personalizedMessage:
          "Thank you for the gentle example you have always set for our family.",
      },
      { name: "Cesar Nadores" },
      { name: "Aries Lindres" },
      { name: "Josef Cruz" },
    ],
    ninangs: [
      { name: "Camille Reyes" },
      { name: "Beatrice Santos" },
      { name: "Lorraine Cruz" },
      { name: "Amara Villanueva" },
    ],
  },

  godparentInvitation: {
    eyebrow: "A Special Request",
    request:
      "With grateful hearts, we would be honored if you would accept the special role of becoming one of the godparents of our beloved son, Adreil Eiden.",
    closing:
      "Your presence, guidance, and love would mean more to our family than words can say. Thank you for prayerfully considering this special role in Adreil Eiden's life.",
    response: {
      // Add the family's inbox to show the "Yes" and "Sorry" email actions.
      // Responses are sent by email; this static website does not store them.
      contactEmail: "",
      note: "Your reply opens in your email app. This website does not store responses.",
      acceptLabel: "Yes, I would be honored.",
      declineLabel: "Sorry, I cannot accept.",
    },
  },

  theme: {
    name: "Elegant Botanical",
    colors: {
      background: "#FAF8F2",
      primary: "#9BAF98",
      secondary: "#E8EBDD",
      accent: "#C6A76A",
      text: "#343832",
      muted: "#85877F",
    },
  },

  content: {
    eyebrow: "A Special Day of Blessing",
    headline: "A Little Blessing",
    subtitle:
      "With grateful hearts, we invite you to celebrate the Holy Christening of our beloved son.",
    closingMessage:
      "Thank you for being part of this special milestone in our little one's life.",
  },

  photos: {
    portrait: {
      src: "/images/denden.png",
      alt: "Soft portrait of a sleeping newborn wrapped in a cream-colored knit.",
      width: 1200,
      height: 1500,
      caption: "Adreil Eiden",
    },
    gallery: [
      {
        src: "/images/gallery-sleep.jpg",
        alt: "A newborn sleeping peacefully beneath a soft ivory blanket.",
        width: 1800,
        height: 1200,
        caption: "Quiet mornings",
      },
      {
        src: "/images/gallery-feet.jpg",
        alt: "Tiny newborn feet resting on a cream-colored towel.",
        width: 1800,
        height: 1200,
        caption: "Tiny toes",
      },
      {
        src: "/images/gallery-mother.jpg",
        alt: "A mother holding her newborn close in soft black and white.",
        width: 1800,
        height: 1200,
        caption: "In her arms",
      },
    ],
  },

  rsvp: {
    googleFormUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSf-REPLACE-WITH-YOUR-FORM-ID/viewform",
    mode: "external",
    deadline: "2027-01-03T23:59:59+08:00",
    note: "Kindly respond by January 3, 2027 so we may prepare a seat for you.",
  },

  music: {
    enabled: true,
    src: "/music/quiet-blessing.mp3",
    title: "Meditation Impromptu 01",
    artist: "Kevin MacLeod",
    volume: 0.32,
    license: {
      label: "CC BY 4.0",
      url: "https://creativecommons.org/licenses/by/4.0/",
    },
    sourceUrl: "https://incompetech.com",
  },

  closing: {
    title: "With all our love",
    message:
      "Thank you for being part of this sacred day. Your presence, prayers, and love mean more to our family than words can say.",
    signature: "The Vacal Family",
  },

  share: {
    siteUrl: "https://adreil-eiden-christening.vercel.app",
    qrLabel: "Scan to open the invitation",
  },
} satisfies InvitationConfig;
