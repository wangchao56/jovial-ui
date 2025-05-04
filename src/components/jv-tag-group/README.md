<JvTagGroup
v-model:tags="tags"
:selectable="true"
:multiple="false"
:addable="true"
:closable="true"
@select="onTagSelect"
@add="onTagAdd"
@close="onTagClose"
/>
<JvTagGroup
:selectable="true"
:multiple="false"
:addable="true"
:closable="true"
@select="onTagSelect"
@add="onTagAdd"
@close="onTagClose"

> <JvTag

          v-for="(item, index) in groupTags"
          :key="index"
          :type="item.type"
        >

{{ item.label }}
</JvTag>
</JvTagGroup>
