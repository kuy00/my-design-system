// My Design System — iOS (SwiftUI). Generated from tokens.json — do not edit by hand.
import SwiftUI

extension Color {
    init(hex: UInt32) {
        self.init(.sRGB,
            red:   Double((hex >> 16) & 0xFF) / 255,
            green: Double((hex >> 8)  & 0xFF) / 255,
            blue:  Double(hex & 0xFF) / 255,
            opacity: 1)
    }
}

struct AppColorScheme {
    let background, surface, border, text, textMuted, primary, accent, success, error, primarySubtle, accentSubtle, successSubtle, errorSubtle: Color
}

enum DesignTokens {
    static let brandPrimary = Color(hex: 0x7C3AED)
    static let brandAccentDark = Color(hex: 0x58A6FF)
    static let brandAccentLight = Color(hex: 0x2563EB)

    static let light = AppColorScheme(
        background: Color(hex: 0xFFFFFF),
        surface: Color(hex: 0xFAF9FC),
        border: Color(hex: 0xECE9F5),
        text: Color(hex: 0x1C1B22),
        textMuted: Color(hex: 0x6B6A76),
        primary: Color(hex: 0x7C3AED),
        accent: Color(hex: 0x2563EB),
        success: Color(hex: 0x16A34A),
        error: Color(hex: 0xDC2626),
        primarySubtle: Color(hex: 0xE8DEFA),
        accentSubtle: Color(hex: 0xDCE4FA),
        successSubtle: Color(hex: 0xDAEDE3),
        errorSubtle: Color(hex: 0xF6DBDE)
    )

    static let dark = AppColorScheme(
        background: Color(hex: 0x0D1117),
        surface: Color(hex: 0x161B22),
        border: Color(hex: 0x30363D),
        text: Color(hex: 0xE6EDF3),
        textMuted: Color(hex: 0x8B949E),
        primary: Color(hex: 0x7C3AED),
        accent: Color(hex: 0x58A6FF),
        success: Color(hex: 0x3FB950),
        error: Color(hex: 0xFF7B72),
        primarySubtle: Color(hex: 0x262042),
        accentSubtle: Color(hex: 0x213145),
        successSubtle: Color(hex: 0x1D3429),
        errorSubtle: Color(hex: 0x3B2A2F)
    )

    static let fontFamily = "Space Grotesk"
    static let fsH1: CGFloat = 40, fsH2: CGFloat = 28, fsH3: CGFloat = 20, fsBody: CGFloat = 16, fsCaption: CGFloat = 13
    static let spaceXs: CGFloat = 4, spaceSm: CGFloat = 8, spaceMd: CGFloat = 16, spaceLg: CGFloat = 24, spaceXl: CGFloat = 40
    static let radiusSm: CGFloat = 6, radiusMd: CGFloat = 8, radiusLg: CGFloat = 10, radiusXl: CGFloat = 20, radiusFull: CGFloat = 999
    static let bpSm: CGFloat = 640, bpMd: CGFloat = 768, bpLg: CGFloat = 1024, bpXl: CGFloat = 1280
}
