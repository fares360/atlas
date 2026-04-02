'use client';

import { useState, useEffect, useRef } from 'react';
import { useChatStore } from '@/lib/store/chat-store';
import { createClient } from '@/lib/supabase/client'; // التحديث هنا
import { MessageSquare, X, Send, Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

export default function ChatWidget() {
  const { 
    isOpen, setIsOpen, 
    messages, fetchMessages, sendMessage, subscribeToMessages, 
    clearChat, isLoading 
  } = useChatStore();
  
  const [input, setInput] = useState('');
  const [userId, setUserId] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null); // مرجع للسكرول
  
  // استخدام العميل الجديد
  const supabase = createClient();

  // 1. التحقق من المستخدم وإنشاء المحادثة عند فتح الشات
  useEffect(() => {
    if (isOpen && !userId) {
      const initChat = async () => {
        setIsInitializing(true);
        
        // التحقق من الجلسة
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          // إذا لم يكن مسجلاً، يمكنك هنا إظهار رسالة أو تحويله
          // حالياً سنكتفي بوقف التحميل
          setIsInitializing(false);
          return;
        }

        const uid = session.user.id;
        setUserId(uid);

        // البحث عن محادثة نشطة
        let { data: conversation } = await supabase
          .from('conversations')
          .select('id')
          .eq('user_id', uid)
          .eq('status', 'active')
          .single();

        // إذا لم توجد، أنشئ واحدة جديدة
        if (!conversation) {
          const { data: newConv, error } = await supabase
            .from('conversations')
            .insert({ user_id: uid })
            .select('id')
            .single();
            
          if (newConv) conversation = newConv;
        }

        // جلب الرسائل والاشتراك
        if (conversation) {
          await fetchMessages(conversation.id);
          subscribeToMessages(conversation.id);
        }
        setIsInitializing(false);
      };

      initChat();
    }
  }, [isOpen, userId, fetchMessages, subscribeToMessages]); // أضفت Dependencies لتحسين الأداء

  // 2. النزول لأسفل الشات تلقائياً عند وصول رسالة جديدة
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || !userId) return;
    const content = input;
    setInput(''); // مسح الحقل فوراً
    await sendMessage(content, userId);
  };

  // الزر العائم (مغلق)
  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 h-14 w-14 rounded-full shadow-xl bg-[#2A5B68] hover:bg-[#1F454F] transition-all duration-300 z-50 flex items-center justify-center"
      >
        <MessageSquare className="h-6 w-6 text-white" />
      </Button>
    );
  }

  // نافذة الشات (مفتوحة)
  return (
    <div className="fixed bottom-6 left-6 w-[350px] h-[500px] bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col z-50 overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
      
      {/* Header */}
      <div className="p-4 bg-[#2A5B68] text-white flex justify-between items-center shadow-md">
        <div>
          <h3 className="font-bold text-lg">المستشار الأسري</h3>
          <p className="text-xs opacity-80">نحن هنا لمساعدتك</p>
        </div>
        <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20 rounded-full" onClick={clearChat} title="مسح المحادثة">
                <Trash2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20 rounded-full" onClick={() => setIsOpen(false)}>
                <X className="h-5 w-5" />
            </Button>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 bg-gray-50 p-4">
        {isInitializing ? (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="h-8 w-8 animate-spin text-[#2A5B68]" />
          </div>
        ) : !userId ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 space-y-2">
                <p>يرجى تسجيل الدخول لبدء المحادثة</p>
            </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 space-y-2">
            <MessageSquare className="h-12 w-12 opacity-20" />
            <p className="text-sm">لا توجد رسائل سابقة.<br/>تفضل بطرح سؤالك.</p>
          </div>
        ) : (
          <div className="space-y-4 pb-4">
            {messages.map((msg) => {
              const isMe = msg.sender_id === userId;
              return (
                <div
                  key={msg.id}
                  className={cn(
                    "flex w-full animate-in fade-in zoom-in-95 duration-200",
                    isMe ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow-sm",
                      isMe
                        ? "bg-[#2A5B68] text-white rounded-br-none"
                        : "bg-white border border-gray-200 text-gray-800 rounded-bl-none"
                    )}
                  >
                    {msg.content}
                    <div className={cn("text-[10px] mt-1 opacity-70", isMe ? "text-right" : "text-left")}>
                        {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={scrollRef} /> {/* عنصر مخفي للنزول إليه */}
          </div>
        )}
      </ScrollArea>

      {/* Input Area */}
      <div className="p-3 border-t bg-white flex gap-2 items-center">
        <Input 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="اكتب رسالتك..." 
          className="flex-1 focus-visible:ring-[#2A5B68]"
          disabled={!userId || isInitializing}
        />
        <Button 
            size="icon" 
            onClick={handleSend} 
            disabled={!input.trim() || isInitializing || !userId} 
            className="bg-[#D4AF37] hover:bg-[#B5952F] text-white rounded-full h-10 w-10 shrink-0"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}