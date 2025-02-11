import { memo, useCallback, useState } from 'react'
import { TextArea } from '../TextArea'
import { Button } from '../Button'
import { Qna } from '@/types/campaign'

interface QnaItemProps {
  question: string
  answer: string
  isDeletable?: boolean
  onRemove?: (index: number) => void
  onChange: (index: number, question: string, answer: string) => void
  index: number
}

const QnaItem = memo(({ question, answer, isDeletable, onRemove, onChange, index }: QnaItemProps) => {
  const [localQuestion, setLocalQuestion] = useState(question)
  const [localAnswer, setLocalAnswer] = useState(answer)

  const handleQuestionChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newQuestion = e.target.value
      setLocalQuestion(newQuestion)
      onChange(index, newQuestion, localAnswer)
    },
    [index, localAnswer, onChange]
  )

  const handleAnswerChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newAnswer = e.target.value
      setLocalAnswer(newAnswer)
      onChange(index, localQuestion, newAnswer)
    },
    [index, localQuestion, onChange]
  )

  const handleRemove = useCallback(() => {
    onRemove?.(index)
  }, [index, onRemove])

  return (
    <div className="mt-[16px] flex flex-col gap-4">
      <TextArea
        name="question"
        value={localQuestion}
        onChange={handleQuestionChange}
        placeholder="Enter your question"
        className="w-full"
      />
      <TextArea
        name="answer"
        value={localAnswer}
        onChange={handleAnswerChange}
        placeholder="Enter your answer"
        className="w-full"
      />
      {isDeletable && onRemove && (
        <Button onClick={handleRemove} variant="secondary" className="self-end">
          Remove
        </Button>
      )}
    </div>
  )
})

QnaItem.displayName = 'QnaItem'

export const CampaignQna = ({
  qnaItems = [{ question: '', answer: '' }],
  onChange,
}: {
  qnaItems: Qna[] | undefined
  onChange: (qnaItems: Qna[]) => void
}) => {
  const handleAddMore = useCallback(() => {
    onChange([...qnaItems, { question: '', answer: '' }])
  }, [qnaItems, onChange])

  const handleRemove = useCallback(
    (index: number) => {
      onChange(qnaItems.filter((_, i) => i !== index))
    },
    [onChange, qnaItems]
  )

  const handleChange = useCallback(
    (index: number, question: string, answer: string) => {
      const newQnaItems = [...qnaItems]
      newQnaItems[index] = { question, answer }
      onChange(newQnaItems)
    },
    [onChange, qnaItems]
  )

  return (
    <div>
      {qnaItems.map((item, index) => (
        <QnaItem
          key={index}
          index={index}
          question={item.question || ''}
          answer={item.answer || ''}
          isDeletable={qnaItems.length > 1}
          onRemove={handleRemove}
          onChange={handleChange}
        />
      ))}

      <button type="button" className="pt-[6px] text-[20px] hover:text-[#131313C9]" onClick={handleAddMore}>
        ➕ Add more questions
      </button>
    </div>
  )
}
