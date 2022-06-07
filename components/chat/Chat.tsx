import useAuth from '../../utils/auth/useAuth';
import 'twin.macro';
import { useCallback, useEffect, useState } from 'react';
import {
  getDatabase,
  onChildAdded,
  onValue,
  push,
  ref,
} from '@firebase/database';
import { getApp } from 'firebase/app';
import tw from 'twin.macro';
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore';

export default function Chat({
  partnerId,
}: {
  /**
   * userId of the person who the user is chatting with
   */
  partnerId: string;
}) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<
    {
      author: string;
      text: string;
      version: 1;
      id: string;
    }[]
  >([]);
  const [text, setText] = useState('');

  useEffect(() => {
    if (!user) return;
    const app = getApp();
    const rtdb = getDatabase(app);
    const messagesRef = ref(
      rtdb,
      'chats/' + [user.uid, partnerId].sort().join('--') + '/messages'
    );
    setMessages([]);
    onChildAdded(messagesRef, (snapshot) => {
      const data = snapshot.val();
      setMessages((v) => [
        ...v,
        {
          ...data,
          id: snapshot.key,
        },
      ]);
    });
  }, [user, partnerId]);
  const onSend = useCallback(() => {
    if (!user) return;

    const app = getApp();
    const rtdb = getDatabase(app);
    const messagesRef = ref(
      rtdb,
      'chats/' + [user.uid, partnerId].sort().join('--') + '/messages'
    );
    push(messagesRef, {
      author: user.uid,
      version: 1,
      text: text,
    });
    setText('');
  }, [user, text, setText, partnerId]);
  const [partnerData, setPartnerData] = useState<
    | {
        name: string;
      }
    | Record<string, any>
  >({});
  useEffect(() => {
    (async () => {
      const app = getApp();
      const db = getFirestore(app);
      const artistsRef = collection(db, 'artists');
      const q = query(artistsRef, where('associatedUser', '==', partnerId));

      const ref = await getDocs(q);

      ref.forEach((snapshot) => {
        // this assumes that there will only be one result
        setPartnerData({
          name: snapshot.data().name,
        });
      });
    })();
  }, [partnerId]);
  return (
    <div tw={'flex-auto'}>
      {messages.map((message) => (
        <p key={message.id}>
          <b>
            {message.author === user?.uid
              ? 'You'
              : partnerData?.name || message.author}
          </b>
          : {message.text}
        </p>
      ))}
      <input
        tw={
          'border border-[#D8D8D8] rounded-[6px] px-[16px] text-[16px] w-36 h-[40px]'
        }
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            onSend();
          }
        }}
      />
      <button
        tw="mt-12 h-9 w-20 relative -top-0.5 text-white bg-theme-red rounded-[6px] px-4 py-1 cursor-pointer hover:bg-[#be4040]"
        type={'button'}
        onClick={onSend}
      >
        Send
      </button>
    </div>
  );
}
