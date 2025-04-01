// components/chat/reasoning-part.tsx
'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { MemoizedMarkdown } from './memoized-markdown'
import { ChevronDownIcon, ChevronUpIcon, Loader2Icon } from 'lucide-react'

interface ReasoningDetail {
  type: 'text'
  text: string
}

export interface ReasoningPart {
  type: 'reasoning'
  reasoning: string
  details: ReasoningDetail[]
}

interface ReasoningMessagePartProps {
  part: ReasoningPart
  isReasoning: boolean
}

export function ReasoningMessagePart({ part, isReasoning }: ReasoningMessagePartProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  const variants = {
    collapsed: {
      height: 0,
      opacity: 0,
      marginTop: 0,
      marginBottom: 0,
    },
    expanded: {
      height: 'auto',
      opacity: 1,
      marginTop: '1rem',
      marginBottom: 0,
    },
  }

  useEffect(() => {
    if (!isReasoning) {
      setIsExpanded(false)
    }
  }, [isReasoning])

  return (
    <div className="flex flex-col">
      {isReasoning ? (
        <div className="flex flex-row gap-2 items-center">
          <div className="font-medium text-sm">Reasoning</div>
          <Loader2Icon className="h-4 w-4 animate-spin" />
        </div>
      ) : (
        <div className="flex flex-row gap-2 items-center">
          <div className="font-medium text-sm">Reasoned for a few seconds</div>
          <button
            className={cn('cursor-pointer rounded-full dark:hover:bg-zinc-800 hover:bg-zinc-200', {
              'dark:bg-zinc-800 bg-zinc-200': isExpanded,
            })}
            onClick={() => {
              setIsExpanded(!isExpanded)
            }}
          >
            {isExpanded ? (
              <ChevronDownIcon className="h-4 w-4" />
            ) : (
              <ChevronUpIcon className="h-4 w-4" />
            )}
          </button>
        </div>
      )}

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            key="reasoning"
            className="text-sm dark:text-zinc-400 text-zinc-600 flex flex-col gap-4 border-l pl-3 dark:border-zinc-800"
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            variants={variants}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            {part.details.map((detail, detailIndex) =>
              detail.type === 'text' ? (
                <MemoizedMarkdown
                  content={detail.text}
                  id={`reasoning-${detailIndex}`}
                  key={`reasoning-${detailIndex}`}
                />
              ) : null
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
