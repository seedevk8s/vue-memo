export class StorageService {
    // 스토리지 이름
    #storageName;

    // 생성자
    constructor(storageName) {
        // 스토리지 이름이 없을 때
        if (!storageName) {
            throw new Error('스토리지 이름을 입력해주세요.');
        }
        this.storageName = storageName;
    }

    // 스토리지 데이터 조회
    #getStorageData() {
        // 스토리지 이름을 키로 사용해 데이터를 조회
        const json = localStorage.getItem(this.#storageName);

        // JSON 데이터가 있으면 파싱해서 리턴
        if (json) {
            return JSON.parse(json);
        }

        // 로컬스토리지(localStorage)에 아직 아무 데이터가 저장되어 있지 않은 경우 실행됩니다. 즉, 최초 실행 시나 해당 스토리지 이름으로 아무것도 저장되지 않은 경우
        return {    // 이 초기값이 없으면 새 항목을 추가할 때 items나 nextId가 undefined가 되어 에러가 남.
            items: [],      // 저장할 항목들을 담는 배열. 초기에는 아무 항목도 없으므로 빈 배열로 시작
            nextId: 1       // 항목에 고유한 ID를 부여하기 위한 자동 증가 번호, 이후 항목이 추가될 때마다 1, 2, 3... 식으로 증가시켜서 중복되지 않는 ID를 생성
        }
    }

    // 스토리지 데이터 저장
    #saveStorageData(obj) {
        const json = JSON.stringify(obj);   // JSON 문자열로 변환
        localStorage.setItem(this.#storageName, JSON.stringify(json));
    }


    // 신규 항목 삽입
    addItem(item) {
        const storageData = this.#getStorageData();

        // 현재 nextId를 항목의 id에 적용하고 1만큼 증가
        item.id = storageData.nextId++; // 수동으로 ID를 설정할 필요 없이 StorageService 내부에서 알아서 처리되므로 항목 중복 문제나 ID 누락 문제를 방지

        storageData.items.push(item);
        this.#saveStorageData(storageData);
    }

    // 전체 항목 조회
    getItem() {
        return this.#getStorageData().items;
    }

    // 특정 항목 조회
    getItems(id) {
        return this.#getStorageData().items.find(i => i.id === id);
    }

    // 특정 항목 수정
    setItem(item) {
        const storageData = this.#getStorageData();

        for (let i = 0; i < storageData.items.length; i++) {
            if (storageData.items[i].id === item.id) {
                storageData.items[i] = item;        //  객체 전체를 교체
                break;
            }
        }

        this.#saveStorageData(storageData);
    }

    // 특정 항목 삭제
    delItem(id) {
        const storageData = this.#getStorageData();
        const idx = storageData.items.findIndex(i => i.id === id);

        if (idx >= 0) {
            storageData.items.splice(idx, 1);   // splice(시작인덱스, 삭제할 개수), 실제로 해당 항목을 완전히 삭제하는 메서드, 원본 배열을 직접 변경
            this.#saveStorageData(storageData);
        }
    }
}



























