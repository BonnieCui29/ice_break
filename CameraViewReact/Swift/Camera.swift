//
//  Camera.swift
//  My Camera App
//
//  Created by Mami Ravaloarison on 2/26/24.
//

import AVFoundation

var isAuthorized: Bool {
    get async {
        let status = AVCaptureDevice.authorizationStatus(for: .video)
        
        var isAuthorized = status == .authorized
        
        if status == .notDetermined {
            isAuthorized = await AVCaptureDevice.requestAccess(for: .video)
        }
        
        return isAuthorized
    }
}


func setUpCatprueSession() async {
    guard await isAuthorized else { return }
    // Code for capture session
}
