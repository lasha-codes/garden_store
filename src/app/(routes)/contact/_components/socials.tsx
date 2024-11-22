import { socials } from '@/app/data/data'

const Socials = () => {
  return (
    <div className='flex items-center gap-12 lg:flex-col lg:items-start max-lg:justify-start w-[350px] lg:w-fit'>
      {socials.map((obj, idx) => {
        return (
          <a href={obj.link} target='_blank' key={idx}>
            {
              <obj.icon
                className={`text-2xl`}
                style={{
                  color: obj.color,
                }}
              />
            }
          </a>
        )
      })}
    </div>
  )
}

export default Socials
