<script>
import { toRaw } from 'vue'

export default {
  props: {
    markerInfo: Object,
    selectedAttraction: Object
  },
  name: 'KakaoMap',
  data() {
    return {
      markers: [] // 카카오에서 제공하는 마커 객체를 저장하는 배열
    }
  },
  mounted() {
    const kakaoApiKey = import.meta.env.VITE_KAKAO_MAP_API_KEY

    if (window.kakao && window.kakao.maps) {
      this.initMap()
    } else {
      const script = document.createElement('script')
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap)
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${kakaoApiKey}`
      document.head.appendChild(script)
    }
  },
  watch: {
    markerInfo(newMarkInfo) {
      this.displayMarker(newMarkInfo)
    },
    selectedAttraction(newAttraction) {
      this.moveCenter(newAttraction.mapy, newAttraction.mapx)
    }
  },
  methods: {
    initMap() {
      const container = document.getElementById('map')
      const options = {
        center: new kakao.maps.LatLng(37.500613, 127.036431), // 지도의 중심좌표
        level: 5
      }

      //지도 객체를 등록합니다.
      //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
      this.map = new kakao.maps.Map(container, options)
    },
    changeSize(size) {
      const container = document.getElementById('map')
      container.style.width = `${size}px`
      container.style.height = `${size}px`
      toRaw(this.map).relayout()
    },
    displayMarker(markersInfo) {
      // 기존에 생성한 마커가 있다면 지도에서 제거
      // 지도에서 제거 === marker.setMap(null)
      if (this.markers.length > 0) {
        this.markers.forEach((marker) => marker.setMap(null))
      }

      // 각 마커에 관한 위치정보를 담는 객체 생성
      const positions = markersInfo.map((position) => {
        // mapx가 lng.. mapy가 lat...
        // 혹시 몰라서 api docs 내용처럼 소수점 6자리로 값 유지
        const lng = Math.floor(position.mapx * 1000000) / 1000000
        const lat = Math.floor(position.mapy * 1000000) / 1000000
        const latLngObject = new kakao.maps.LatLng(lat, lng)

        return latLngObject
      })

      // 마커 정보를 이용해 지도에 이용할 marker 객체 생성
      const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png'
      if (positions.length > 0) {
        const markerImageSize = new kakao.maps.Size(24, 35)
        var markerImage = new kakao.maps.MarkerImage(imageSrc, markerImageSize)

        // 지도에서 사각영역 정보를 표시현하는 객체를 생성하고, 좌표 정보들을 다 포함할 수 있도록 사각 영역 정보를 확장 후 객체 반환
        // https://apis.map.kakao.com/web/documentation/#LatLngBounds_extend
        // https://apis.map.kakao.com/web/sample/setBounds/

        const bounds = new kakao.maps.LatLngBounds()

        let i
        for (i = 0; i < positions.length; i++) {
          const marker = new kakao.maps.Marker({
            map: toRaw(this.map),
            title: markersInfo[i].title,
            position: positions[i],
            image: markerImage // 마커 이미지
          })
          marker.setMap(toRaw(this.map))
          this.markers.push(marker)

          // 확장된 영역 정보를 이용하여 map에 셋팅
          bounds.extend(positions[i])
        }

        toRaw(this.map).setBounds(bounds)
      }
    },
    displayInfoWindow() {
      if (this.infowindow && this.infowindow.getMap()) {
        //이미 생성한 인포윈도우가 있기 때문에 지도 중심좌표를 인포윈도우 좌표로 이동시킨다.
        toRaw(this.map).setCenter(this.infowindow.getPosition())
        return
      }

      var iwContent = '<div style="padding:5px;">Hello World!</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
        iwPosition = new kakao.maps.LatLng(33.450701, 126.570667), //인포윈도우 표시 위치입니다
        iwRemoveable = true // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

      this.infowindow = new kakao.maps.InfoWindow({
        map: toRaw(this.map), // 인포윈도우가 표시될 지도
        position: iwPosition,
        content: iwContent,
        removable: iwRemoveable
      })

      toRaw(this.map).setCenter(iwPosition)
    },
    moveCenter(lat, lng) {
      toRaw(this.map).setCenter(new kakao.maps.LatLng(lat, lng))
    }
  }
}
</script>

<template>
  <div id="map" class="mt-3"></div>
</template>

<style scoped>
#map {
  width: 100%;
  height: 400px;
}
</style>

<!-- kakao api 사용 시 참고 : https://devtalk.kakao.com/t/vue-kakao-map/114974 -->
<!-- script tag를 index.html에 붙여도 에러가 발생 -->
//
