import {
  calculateCounterOffer,
  classifyOffer,
  formatPrice,
} from '../features/negotiation/negotiationContext'

/**
 * Message Generator for Haggly
 *
 * Generates deterministic fallback responses based on structured negotiation logic.
 */

/**
 * Message templates organized by offer type and tone
 */
const templates = {
  lowball: {
    friendly: [
      `Thanks for the offer! I appreciate your interest in the {item}. I'm looking to get closer to my asking price of {askingPrice} though — it's priced fairly for what it is. Would you be able to come up to {counterOffer}? Let me know!`,
      `Hey, thanks for reaching out! {theirOffer} is a bit lower than I can go on this {item}. I could do {counterOffer} if that works for you? It's in great condition and priced to sell. 😊`,
      `Hi there! I appreciate the interest. I'm firm around {counterOffer} for the {item} — I've priced it competitively based on similar listings. Let me know if that works for you!`
    ],
    firm: [
      `Thanks for the offer. I'm holding firm at {askingPrice} for the {item} — it's priced fairly and I've had other interest. Let me know if that works for you.`,
      `I appreciate the interest, but {theirOffer} is too low for this {item}. My price is {askingPrice} and it's firm. Happy to answer any questions about condition or features.`,
      `Thanks, but I'll have to pass on that offer. The {item} is worth {askingPrice} and I'm not in a rush to sell. Reach out if you change your mind!`
    ],
    casual: [
      `Haha appreciate the offer but {theirOffer} is pretty far off 😅 I could maybe do {counterOffer} but that's about as low as I can go. Lmk!`,
      `Hey! Yeah {theirOffer} won't work for me on this one. Looking for closer to {askingPrice}. It's a solid {item} though if you want to come up a bit!`,
      `Gonna have to pass at that price tbh. Could do {counterOffer} if you're interested, otherwise no worries!`
    ]
  },
  
  counter: {
    friendly: [
      `Thanks for the offer! I can meet you in the middle at {counterOffer} for the {item}. That's a fair price and I can be flexible on pickup times. Does that work for you?`,
      `Hey, I appreciate the offer of {theirOffer}! Would you be able to do {counterOffer}? That's the lowest I can go and it's still a great deal for this {item}. Let me know!`,
      `Thanks for your interest! I could come down to {counterOffer} — that's my best price for the {item}. It's in excellent condition. When would you want to pick up?`
    ],
    firm: [
      `I can do {counterOffer} for the {item}, but that's my final price. It's priced fairly for the condition and I've had other inquiries. Let me know if you want to move forward.`,
      `{theirOffer} is close, but I need {counterOffer} minimum for this {item}. That's my bottom line. Want me to hold it for you at that price?`,
      `I'll counter at {counterOffer}. The {item} is worth it at that price — happy to send more photos if you want to see the condition. Take it or leave it.`
    ],
    casual: [
      `Could probably do {counterOffer}? That's about as low as I wanna go. Lmk if that works!`,
      `Hmm how about {counterOffer}? Splits the difference a bit. It's a nice {item}, you won't be disappointed 👍`,
      `{theirOffer} is close! Can you do {counterOffer}? That works better for me.`
    ]
  },
  
  close: {
    friendly: [
      `Thanks for the reasonable offer! I can do {counterOffer} — just a little closer to my asking price. It's a great {item} and I think that's a fair deal for both of us. Sound good?`,
      `Hey, I appreciate the fair offer! Would {counterOffer} work? That's just a small bump and I can have it ready whenever you're free to pick up.`,
      `Thanks! Your offer is really close. If you can do {counterOffer}, we have a deal! I'm flexible on timing. 😊`
    ],
    firm: [
      `Good offer. I'll accept {counterOffer} — that's my final number. Let me know if you want to proceed and I can set it aside for you.`,
      `Close, but I need {counterOffer} to make this work. That's firm. Can you do it?`,
      `I can meet you at {counterOffer}. That's fair for this {item} in this condition. Yes or no?`
    ],
    casual: [
      `Pretty close! Can you swing {counterOffer}? Then it's yours 🤝`,
      `Nice offer! If you can bump it to {counterOffer} we got a deal`,
      `Almost there! {counterOffer} and it's all yours. Lmk!`
    ]
  },
  
  acceptable: {
    friendly: [
      `That works for me! {theirOffer} for the {item} — you've got a deal. 🎉 When would you like to pick it up? I'm pretty flexible!`,
      `Great offer! I'll accept {theirOffer}. The {item} is yours! Let me know your availability and we can arrange pickup.`,
      `Deal! {theirOffer} works. Thanks for the fair offer — when can you come get the {item}?`
    ],
    firm: [
      `{theirOffer} works. The {item} is yours. When can you pick up? I'm available this week.`,
      `Accepted. {theirOffer} for the {item}. Let me know when you can come by. First come, first served — I have other interest.`,
      `Done. {theirOffer} is fair. What day works for pickup?`
    ],
    casual: [
      `Deal! {theirOffer} works for me 👍 When you wanna grab it?`,
      `Sold! Lmk when you're free to pick up the {item}`,
      `You got it! {theirOffer} is good. Hit me up when you can swing by`
    ]
  },
  
  accept: {
    friendly: [
      `Sold! 🎉 {theirOffer} for the {item} works perfectly. Thank you! When would you like to pick it up? I'm flexible with timing.`,
      `Yes! That's a deal. The {item} is yours at {theirOffer}. I really appreciate the fair offer — let me know when works for pickup!`,
      `Absolutely, {theirOffer} is great! Thank you for the smooth transaction. When can you come grab it?`
    ],
    firm: [
      `Deal. {theirOffer} accepted for the {item}. When can you pick up? I'm holding it for you for 24 hours.`,
      `{theirOffer} works. It's yours. Let me know pickup details ASAP.`,
      `Accepted. {theirOffer} for the {item}. Respond with your pickup time.`
    ],
    casual: [
      `Done deal! 🙌 When can you come get it?`,
      `Yep {theirOffer} works! It's yours. Lmk when you're free`,
      `Sold! When you wanna pick up?`
    ]
  }
}

/**
 * Generate messages for all three tones
 */
export function generateMessages({ item, askingPrice, theirOffer, minimumPrice }) {
  const offerType = classifyOffer({ askingPrice, theirOffer, minimumPrice })
  const counterOffer = calculateCounterOffer({ askingPrice, theirOffer, minimumPrice })
  
  const replacements = {
    '{item}': item,
    '{askingPrice}': formatPrice(askingPrice),
    '{theirOffer}': formatPrice(theirOffer),
    '{counterOffer}': formatPrice(counterOffer),
    '{minimumPrice}': minimumPrice ? formatPrice(minimumPrice) : ''
  }
  
  const applyReplacements = (text) => {
    let result = text
    for (const [key, value] of Object.entries(replacements)) {
      result = result.replace(new RegExp(key, 'g'), value)
    }
    return result
  }
  
  // Pick random template for each tone
  const getRandomTemplate = (tone) => {
    const toneTemplates = templates[offerType][tone]
    return toneTemplates[Math.floor(Math.random() * toneTemplates.length)]
  }
  
  const descriptions = {
    lowball: {
      friendly: "Polite but redirects to a reasonable price",
      firm: "Clear boundaries, shows you won't be pushed around",
      casual: "Relaxed vibe but still stands your ground"
    },
    counter: {
      friendly: "Warm counter-offer that invites collaboration",
      firm: "Direct counter with clear expectations",
      casual: "Easygoing but knows what they want"
    },
    close: {
      friendly: "Encouraging them to close the gap",
      firm: "Final price, take it or leave it",
      casual: "Almost there, just need a little more"
    },
    acceptable: {
      friendly: "Enthusiastic acceptance, good vibes",
      firm: "Professional acceptance, moves to logistics",
      casual: "Chill acceptance, keeps it simple"
    },
    accept: {
      friendly: "Grateful and excited to complete the sale",
      firm: "Efficient acceptance, focuses on next steps",
      casual: "Quick and easy, let's do this"
    }
  }
  
  return [
    {
      tone: 'Friendly',
      emoji: '😊',
      message: applyReplacements(getRandomTemplate('friendly')),
      description: descriptions[offerType].friendly
    },
    {
      tone: 'Firm',
      emoji: '💪',
      message: applyReplacements(getRandomTemplate('firm')),
      description: descriptions[offerType].firm
    },
    {
      tone: 'Casual',
      emoji: '✌️',
      message: applyReplacements(getRandomTemplate('casual')),
      description: descriptions[offerType].casual
    }
  ]
}

export default generateMessages
