import SwiftUI
import AVFoundation

struct ContentView: View {
    @State private var isCameraOn = false

    var body: some View {

        VStack {
            Button("Turn camera on") {
                Task {
                    authorize = guard await isAuthorized else {
                        return
                    }
                    
                    isCameraOn = true
                }
            }
        }
    }

    var isAuthorized: Bool {
        get async {
            let status = await AVCaptureDevice.requestAccess(for: .video)

            var isAuthorized = status == .authorized

            if status == .notDetermined {
                isAuthorized = await AVCaptureDevice.requestAccess(for: .video)
            }   

            return isAuthorized
        }
    }
    
}