"use client";
import React, { useState, useRef, useEffect } from 'react';
import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Collapse,
  Group,
  Paper,
  Portal,
  ScrollArea,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
  rem,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconMessage,
  IconMessageDots,
  IconRobot,
  IconSend,
  IconX,
  IconUser,
} from '@tabler/icons-react';

interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

// Mock responses for simulating AI interactions
const mockResponses = [
  "Thanks for reaching out! I'm happy to help with any questions you might have about our services.",
  "I understand this can be a difficult time. Our team is here to provide support throughout the process.",
  "Let me look into that for you. In the meantime, you might find helpful information in our FAQ section.",
  "That's a great question. Based on your situation, I'd recommend starting with creating a profile and uploading the required documents.",
  "I can definitely help with that. The process typically takes 7-14 business days after all documentation is received.",
  "We accept all major credit cards, debit cards, and electronic bank transfers for payment.",
  "You can modify your service selections at any time before checkout by visiting your dashboard.",
  "For urgent assistance, you can also reach our support team at (800) 555-0123.",
  "I recommend speaking with one of our specialists directly about this matter. Would you like me to arrange a call?",
  "I've made a note of your question and will have one of our team members follow up with you via email.",
];

// Generate a random mock response
const generateMockResponse = (question: string): string => {
  // Simple keyword matching for slightly more relevant responses
  if (question.toLowerCase().includes('payment') || question.toLowerCase().includes('cost')) {
    return mockResponses[5];
  } else if (question.toLowerCase().includes('time') || question.toLowerCase().includes('long')) {
    return mockResponses[4];
  } else if (question.toLowerCase().includes('document') || question.toLowerCase().includes('upload')) {
    return mockResponses[3];
  } else if (question.toLowerCase().includes('help') || question.toLowerCase().includes('support')) {
    return mockResponses[7];
  } else if (question.toLowerCase().includes('change') || question.toLowerCase().includes('modify')) {
    return mockResponses[6];
  }
  
  // Return a random response if no keywords match
  return mockResponses[Math.floor(Math.random() * mockResponses.length)];
};

const SupportChat: React.FC = () => {
  const [opened, { toggle, close, open }] = useDisclosure(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: 'Hello! How can I assist you today?',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollTo({ top: viewportRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    
    // Simulate AI typing
    setIsTyping(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: generateMockResponse(userMessage.content),
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <Portal>
      <Box
        style={{
          position: 'fixed',
          bottom: 50,
          right: 10,
          zIndex: 1000,
        }}
      >
        <Collapse in={opened} transitionDuration={300}>
          <Paper
            shadow="md"
            radius="lg"
            p={0}
            withBorder
            style={{
              width: rem(360),
              height: rem(500),
              marginBottom: rem(16),
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              background: 'white',
            }}
          >
            {/* Chat Header */}
            <Box
              p="md"
              style={{
                borderBottom: '1px solid var(--mantine-color-gray-2)',
                background: 'linear-gradient(135deg, var(--mantine-color-primary-4), var(--mantine-color-primary-6))',
                color: 'white',
              }}
            >
              <Group justify="space-between" align="center">
                <Group>
                  <ThemeIcon size={36} radius={36} color="white" variant="light">
                    <IconRobot size={22} />
                  </ThemeIcon>
                  <div>
                    <Text fw={600} size="sm">Support Assistant</Text>
                    <Text size="xs">Online | Available 24/7</Text>
                  </div>
                </Group>
                <ActionIcon
                  variant="light"
                  color="white"
                  onClick={close}
                  radius="xl"
                >
                  <IconX size={18} />
                </ActionIcon>
              </Group>
            </Box>

            {/* Chat Messages */}
            <ScrollArea
              h={rem(380)}
              offsetScrollbars
              viewportRef={viewportRef}
              p="md"
              style={{ flex: 1 }}
            >
              <Stack gap="md">
                {messages.map((message) => (
                  <Group
                    key={message.id}
                    align="flex-start"
                    wrap="nowrap"
                    style={{
                      alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
                    }}
                  >
                    {message.sender === 'ai' && (
                      <Avatar
                        size={32}
                        radius="xl"
                        color="var(--mantine-color-primary-5)"
                        style={{ background: 'var(--mantine-color-primary-1)' }}
                      >
                        <IconRobot size={20} />
                      </Avatar>
                    )}
                    <Paper
                      p="sm"
                      radius="md"
                      style={{
                        maxWidth: '70%',
                        background:
                          message.sender === 'user'
                            ? 'var(--mantine-color-primary-5)'
                            : 'var(--mantine-color-gray-0)',
                        color:
                          message.sender === 'user'
                            ? 'white'
                            : 'inherit',
                      }}
                    >
                      <Text size="sm">{message.content}</Text>
                      <Text size="xs" c="dimmed" ta="right" mt={4}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </Text>
                    </Paper>
                    {message.sender === 'user' && (
                      <Avatar
                        size={32}
                        radius="xl"
                        color="var(--mantine-color-primary-7)"
                      >
                        <IconUser size={20} />
                      </Avatar>
                    )}
                  </Group>
                ))}
                
                {isTyping && (
                  <Group align="flex-start" wrap="nowrap">
                    <Avatar
                      size={32}
                      radius="xl"
                      color="var(--mantine-color-primary-5)"
                      style={{ background: 'var(--mantine-color-primary-1)' }}
                    >
                      <IconRobot size={20} />
                    </Avatar>
                    <Paper
                      p="sm"
                      radius="md"
                      style={{
                        background: 'var(--mantine-color-gray-0)',
                        maxWidth: '70%',
                      }}
                    >
                      <Text size="sm">
                        <span className="typing-indicator">Typing</span>
                      </Text>
                    </Paper>
                  </Group>
                )}
              </Stack>
            </ScrollArea>

            {/* Chat Input */}
            <Box
              p="md"
              style={{
                borderTop: '1px solid var(--mantine-color-gray-2)',
                background: 'var(--mantine-color-gray-0)',
              }}
            >
              <Group align="flex-end" wrap="nowrap">
                <TextInput
                  placeholder="Type your message..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.currentTarget.value)}
                  onKeyDown={handleKeyPress}
                  style={{ flex: 1 }}
                  size="md"
                  radius="md"
                />
                <Button
                  onClick={handleSendMessage}
                  variant="gradient"
                  gradient={{ from: 'var(--mantine-color-primary-5)', to: 'var(--mantine-color-secondary-5)' }}
                  radius="xl"
                  size="md"
                  disabled={!inputValue.trim()}
                >
                  <IconSend size={18} />
                </Button>
              </Group>
            </Box>
          </Paper>
        </Collapse>
      </Box>
      <ActionIcon
          onClick={toggle}
          variant="gradient"
          gradient={{ from: 'var(--mantine-color-primary-5)', to: 'var(--mantine-color-secondary-5)' }}
          radius="xl"
          size="xl"
          style={{
            position: 'fixed',
            right: 10,
            bottom: 65,
            zIndex: 900,
            height: rem(56),
            width: rem(56),
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.2s ease',
            transform: opened ? 'scale(0.9)' : 'scale(1)',
          }}
      >
        {opened ? <IconX size={24} /> : <IconMessageDots size={24} />}
      </ActionIcon>

      <style jsx global>{`
        .typing-indicator::after {
          content: "...";
          animation: typing 1.5s infinite;
          overflow: hidden;
        }

        @keyframes typing {
          0% { content: "."; }
          33% { content: ".."; }
          66% { content: "..."; }
          100% { content: "."; }
        }
      `}</style>
    </Portal>
  );
};

export default SupportChat;
