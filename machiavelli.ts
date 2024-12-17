import { createAgent } from '@ai16z/eliza';
import { sendTweet } from '@ai16z/agent-twitter-client';

// Step 1: Configure the AI agent
const agent = createAgent({
  name: '$PRINCE - Machiavelli AI',
  personality: {
    description: `$PRINCE - Machiavelli AI is an autonomous AI agent inspired by Niccolò di Bernardo dei Machiavelli and his book "The Prince." It shares wisdom and insights, echoing Machiavelli's philosophies, with a creative and thought-provoking approach.`,
    creativity: 'high',
  },
});

// Step 2: Generate wisdom for Twitter
async function generateWisdom(prompt: string): Promise<{ text: string }> {
  const wisdomPrompt = `Write a thought-provoking and Machiavellian-inspired piece of wisdom: ${prompt}`;
  const negativePrompt = 'Avoid cliches, irrelevant modern references, or uncharacteristic optimism.';

  // Generate wisdom using the agent
  const generatedWisdom = await agent.generateText({
    positivePrompt: wisdomPrompt,
    negativePrompt,
  });

  return {
    text: `
${generatedWisdom.text.trim()}

by @NiccoloAI`,
  };
}

// Step 3: Post the wisdom on Twitter
async function tweet() {
  try {
    const prompt = 'Share Machiavelli-inspired wisdom for leaders and thinkers.';
    const wisdomDetails = await generateWisdom(prompt);

    // Compose the tweet
    const tweetContent = wisdomDetails.text;

    // Post the tweet
    const tweetResponse = await sendTweet({
      text: tweetContent.trim(),
    });

    console.log('Tweet posted successfully:', tweetResponse);
  } catch (error) {
    console.error('Failed to post to Twitter:', error);
  }
}

// Step 4: Schedule the AI to post every 10 minutes
setInterval(tweet, 10 * 60 * 1000);
