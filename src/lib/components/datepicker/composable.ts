import twLocale from 'ant-design-vue/es/date-picker/locale/zh_TW'
import enLocale from 'ant-design-vue/es/date-picker/locale/en_US'

export function useDateLocale () {
  const { locale: currentLocale } = useI18n()

  const locale = computed(() => ({
    'zh-TW': {
      ...twLocale,
      lang: {
        ...twLocale.lang,
        ok: '確認',
        now: '現在',
      },
    },
    'en-US': {
      ...enLocale,
      lang: {
        ...enLocale.lang,
      },
    },
  }[currentLocale.value]))

  return {
    locale,
  }
}
