<template>
  <div class="image-uploader">
    <label :class="statusClass" :style="bgStyle" @click="deleteImage($event)">
      <span>{{ statusText }}</span>
      <input
        type="file"
        accept="image/*"
        class="form-control-file"
        @change="setImage($event)"
        :disabled="inputDisabled"
      />
    </label>
  </div>
</template>

<script>
import { ImageService } from '../image-service.js';

export default {
  name: 'ImageUploader',
  data() {
    return {
      status: 'empty',
      justDeleted: false,
    };
  },
  props: {
    imageId: {
      default: null,
    },
  },
  model: {
    event: 'change',
    prop: 'imageId',
  },
  computed: {
    statusText() {
      let text = '';
      switch (this.status) {
        case 'empty':
          text = 'Загрузить изображение';
          break;
        case 'uploading':
          text = 'Загрузка...';
          break;
        case 'uploaded':
          text = 'Удалить изображение';
          break;
      }
      return text;
    },
    bgStyle() {
      return ImageService.getImageURL(this.imageId)
        ? { '--bg-image': `url(${ImageService.getImageURL(this.imageId)})` }
        : false;
    },
    statusClass() {
      let text = '';
      switch (this.status) {
        case 'empty':
          text = '';
          break;
        case 'uploading':
          text = 'image-uploader__preview-loading';
          break;
        case 'uploaded':
          text = 'image-uploader__preview';
          break;
      }
      return text;
    },

    inputDisabled() {
      return this.status != 'empty' || this.justDeleted;
    },
  },

  watch: {
    imageId(value) {
      if (value) this.status = 'uploaded';
      else this.status = 'empty';
      return;
    },
  },
  methods: {
    async setImage(event) {
      let file = event.target.files[0];
      this.status = 'uploading';
      let image;
      image = await ImageService.uploadImage(file);
      this.$emit('change', image.id);
    },
    deleteImage() {
      if (this.status != 'uploaded') return;
      this.$emit('change', null);
      this.justDeleted = true;
      setTimeout(() => (this.justDeleted = false), 50);
    },
  },
};
</script>

<style scoped>
.image-uploader .form-control-file {
  opacity: 0;
  height: 0;
}

.image-uploader .image-uploader__preview {
  --bg-image: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.4),
      rgba(0, 0, 0, 0.4)
    ),
    var(--bg-image);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader .image-uploader__preview > span {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader .image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader .image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
