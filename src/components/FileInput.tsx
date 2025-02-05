import { UploadIcon } from './Icons/UploadIcon'

export const FileInput = ({
  onChange,
  label,
  multiple = false,
  id,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  label: string
  multiple?: boolean
  id?: string
}) => {
  return (
    <div className="flex flex-col items-center gap-3">
      <input id={id} name={id} type="file" className="hidden" onChange={onChange} multiple={multiple} />
      <label
        htmlFor={id}
        className="mt-[16px] box-border flex h-[50px] w-full cursor-pointer items-center justify-center rounded-[10px] border border-solid px-[30px]"
      >
        <UploadIcon className="mr-2" />
        {label}
      </label>
    </div>
  )
}
