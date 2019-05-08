import coreService from '@/components/Core/services/CoreService'

const isUnique = {
  getMessage: (field, params, data) => {
    return data.message
  },
  validate(value, args) {
    return coreService.validate(value, args)
  }
}

export default isUnique
