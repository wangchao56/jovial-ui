import type { PropType, Slot, SlotsType, VNodeArrayChildren } from 'vue'
import { ensureOnlyChild, isSlotNode } from '@/utils'
import { defineComponent, Fragment, ref } from 'vue'

export default defineComponent({
  name: 'JvFragmentWrapper',
  props: {
    setRef: {
      type: Function as PropType<(el: HTMLElement) => void>,
      required: true,
    },
    onlyChild: {
      type: Boolean,
      default: false,
    },
  },
  slots: Object as SlotsType<{
    default: Slot
  }>,
  setup(props, { slots }) {
    const fragmentRef = ref<Element>()

    return () => {
      const [firstChild] = slots.default?.() || []
      const child
        = props.onlyChild && isSlotNode(firstChild)
          ? ensureOnlyChild(firstChild?.children as VNodeArrayChildren)
          : firstChild

      return (
        <Fragment
          ref={(el) => {
            fragmentRef.value = el as Element
            props.setRef((el as HTMLElement)?.nextElementSibling as HTMLElement)
          }}
        >
          {child}
        </Fragment>
      )
    }
  },
})
