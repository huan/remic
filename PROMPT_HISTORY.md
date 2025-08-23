# Vibe Coding Prompt Logs

## PROMPTS_HISTORY is a IMMUTABLE CHANGELOG for logging the prompt history

- DO NOT MODIFY EXISTING PROMPTS HISTORY
- Only add new prompts by inserting them into the right location.

Vibe Prompting logs go here.

## 2025-08-22

---

read README.md and understand what we are building in the hackathon. after that, learn following changes:

1. We changed the tech stack from swift native app, to pure web PWA app.
2. User will visit https://remic.app and install the PWA to their phone's desktop, after that, user can open the PWA like a native app
3. The first user open the ReMic app can invite other people connect with them, by showing a qr code, or nfc/airdrop (if possible via web app). second user will scan the qr code (or any connection invite) then connect with the first user.
4. we will use multi modal LLM to convert the audio in realtime with prompts.
5. we might use WebRTC to make the audio connection between first and second user, or we will use a central server to relay everything.

Based on the above design change, give your best advise based on building a hackathon MVP, list all of them with detailed explanations.

---

## Huan's Project, code name: ReMic

I have a plan to work on a project in my head for a few weeks: near real time voice translation for in person conversations. the idea is coming from my mom's usa daily living issues: she cannot speak english but she's loving making local friends. google/apple translate is good for conversation translation, and chatgpt also can do a quite good job. However, it's still not convenient enough, it's a blocker when my mom want to communicate with  english only speakers. Even I have a few tech friends, when they first time trying to use google translate app on their phone, they also need struggle a while before learned how to use it, and it is not easy to act as a connector between my mom (chinese only speaker) with them (english only speaker), so there definitely a pain point problem need to be solved.

Today's tech is already ready to solve lots of problems: 
1. multi modal models can get real time audio as input, with text prompt, they can generate real time audio output, with quite high quality, and translate between languages if needed.
2.  iphone has great mic and speaker, airpods gives iphone another mic and speaker!

So why not build a app, which can solve the above problem, give my mom's a smooth experience when she talking with english only speakers?

Here's the planned solution:
1. an ios app running on iphone, using airpods mic/speaker and iphone mic/speaker at the same time.
2. when airpod has been touched, the airpod mic activated, as well as the iphone speaker. the audio collected from airpod mic will be send to multi modal real time api to generate output audio which will be played from the iphone speaker - the output audio will be in another language, or modify tones, as prompt defined in the app. For my mom's case, if my mom has the airpod, then the audio will be translated from chinese to english.
3. when the button (called PTT, Push To Talk) on the app on the phone has been pushed, the mic on iphone will be activated, as well as the airpod speaker will be activated too. The audio collected from iphone mic will be send to multi modal real time api to generate output audio which will be played from the airpod speaker, in my mom's case, it will convert english to chinese.

That's the idea. If this app has been implemented, my mom will have a near real time translator with her all the time (7x24), when she want to talk with others, she just need to wear the airpods, and open the ReMic app on her iphone, then the other can use the iphone to listen to her, and use ptt to convert english to chinese to her, played in her airpod. When my mom's speaking, she need to touch her airpod to activate ReMic, then she just talk as normal - the airpod mic will collect her voice and play the translated voice on iphone's speaker.

I want to build this project at YC AI Agent hackathon - ReMic - a beauty filter for realtime translation for in person conversations.

I can vibe coding everything, but I want to find a good designer with me - that's all I need, because I do not know anything about design and definitely not good at it. Even worse, I do not know how to vibe designing too. So I might need to recruit a team member for designing. idealy, she should be a girl, because girls always have better sense about designing than guys. (maybe a male would be acceptable if he is a gay, because in statistics,  female thinking is better for designing). my team mate can be no engineering experience at all, because I can deal with it, but she must be a great UI/UE/UX designer.

Below is two use cases in my head. They are in Chinese, but you will keep thinking in English and we will keep discussing in English.

比如说，有两个应用场景。第一个就是我妈要是和我家里来的朋友聊天的时候，现在用 Google Translate 还是很不方便。

但是如果她坐在那，想聊的话，就带上苹果耳机，然后把手机打开放在桌子上。我妈在那就可以说中文，然后基本上实时地，手机就把英文的语音同步地放出来了。 

同时，这个APP也会有一个钮“push to talk”。如果有人想和我妈聊天，他就可以拿起手机来，然后“push to talk”，他在对着手机说的话，我妈耳机里面就基本上实时听到对应的中文了。

还有一个场景，就是在 hackathon 的最后，面对评委进行 pitch 的时候：我第一个英文不好，第二个有口音，第三个语气不够自然，还有 pitch 的词语选择也不好。 

所以我可以带着苹果的耳机，把手机对着麦克风。我对着耳机说我最擅长的中文或英文，然后 ReMic 就负责把我说的话实时翻译成流利的英语，同时还可以加上 pitch 的语气转换一下放出去。 

比如说，我可以设置 YC Demo Day 的 pitch，所以ReMic用这种语气外放了，演讲效果会更好，因为受众听起来更舒服。

-------------

That's what I'm going to do today and tomorrow. My goal is: keep my moves on social media , like post everything (idea, preparation, team member recruiting, yc office kickoff, what's going on later, each version of my vibe coding, my github repo, product screenshot, first worked version video, design post its, meeting notes, submit to app store, user feedback, everything) on my twitter , and keep working this evening and tonight and tomorrow morning, make the MVP app and prove PMF in the YC hq office with other hackers and people, prepare final pitch, and try my best to get the final price. 

You are an experienced Hackathon hacker, with great vibe coding experience, also a great UI/UE/UX designer with great product sense. Help me to prepare everything, think from my side, like if you were me, draft plan and everything I needed, to prepare the hackathon.

Recap everything together, think it as a whole, put yourself in my shoes, then ask me at least 15 questions to get the whole picture of everything to make sure you can make the plan best for the situation before we move forward.