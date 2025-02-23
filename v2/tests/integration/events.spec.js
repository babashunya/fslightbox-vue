import FsLightbox from "../../../base/src/js/FsLightbox.vue";
import { mount } from "@vue/test-utils";
import { testSources } from "<rootDir>/tests/__tests-services__/testVars";
import { ANIMATION_TIME } from "../../../base/src/js/constants/css-constants";

jest.useFakeTimers();
const onInit = jest.fn();
const onOpen = jest.fn();
const onClose = jest.fn();
const onShow = jest.fn();

test('events', async () => {
    const fsLightbox = await mount(FsLightbox, {
        propsData: {
            toggler: false,
            openOnMount: true,
            sources: testSources,
            onOpen: onOpen,
            onInit: onInit,
            onClose: onClose,
            onShow: onShow,
        }
    });

    expect(onInit).toBeCalled();
    expect(onOpen).toBeCalled();
    expect(onClose).not.toBeCalled();
    expect(onShow).not.toBeCalled();

    await fsLightbox.setProps({ toggler: true });
    await jest.advanceTimersByTime(ANIMATION_TIME - 30);
    expect(onInit).toBeCalledTimes(1);
    expect(onOpen).toBeCalledTimes(1);
    expect(onClose).toBeCalled();
    expect(onShow).not.toBeCalled();

    await fsLightbox.setProps({ toggler: false });
    expect(onInit).toBeCalledTimes(1);
    expect(onOpen).toBeCalledTimes(2);
    expect(onClose).toBeCalledTimes(1);
    expect(onShow).toBeCalledTimes(1);

    await fsLightbox.destroy();
});
