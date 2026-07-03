// My Design System — Flutter (Dart). Generated from tokens.json — do not edit by hand.
import 'package:flutter/material.dart';

class AppColorScheme {
  final Color background, surface, border, text, textMuted, primary, accent, success, error, primarySubtle, accentSubtle, successSubtle, errorSubtle;
  const AppColorScheme({
    required this.background,
    required this.surface,
    required this.border,
    required this.text,
    required this.textMuted,
    required this.primary,
    required this.accent,
    required this.success,
    required this.error,
    required this.primarySubtle,
    required this.accentSubtle,
    required this.successSubtle,
    required this.errorSubtle,
  });
}

class DesignTokens {
  DesignTokens._();

  static const Color brandPrimary = Color(0xFF7C3AED);
  static const Color brandAccentDark = Color(0xFF58A6FF);
  static const Color brandAccentLight = Color(0xFF2563EB);

  static const AppColorScheme light = AppColorScheme(
    background: Color(0xFFFFFFFF),
    surface: Color(0xFFFAF9FC),
    border: Color(0xFFECE9F5),
    text: Color(0xFF1C1B22),
    textMuted: Color(0xFF6B6A76),
    primary: Color(0xFF7C3AED),
    accent: Color(0xFF2563EB),
    success: Color(0xFF16A34A),
    error: Color(0xFFDC2626),
    primarySubtle: Color(0xFFE8DEFA),
    accentSubtle: Color(0xFFDCE4FA),
    successSubtle: Color(0xFFDAEDE3),
    errorSubtle: Color(0xFFF6DBDE),
  );

  static const AppColorScheme dark = AppColorScheme(
    background: Color(0xFF0D1117),
    surface: Color(0xFF161B22),
    border: Color(0xFF30363D),
    text: Color(0xFFE6EDF3),
    textMuted: Color(0xFF8B949E),
    primary: Color(0xFF7C3AED),
    accent: Color(0xFF58A6FF),
    success: Color(0xFF3FB950),
    error: Color(0xFFFF7B72),
    primarySubtle: Color(0xFF262042),
    accentSubtle: Color(0xFF213145),
    successSubtle: Color(0xFF1D3429),
    errorSubtle: Color(0xFF3B2A2F),
  );

  static const String fontFamily = 'Space Grotesk';
  static const double fsH1 = 40, fsH2 = 28, fsH3 = 20, fsBody = 16, fsCaption = 13;
  static const FontWeight fwRegular = FontWeight.w400;
  static const FontWeight fwSemibold = FontWeight.w600;
  static const FontWeight fwBold = FontWeight.w700;

  static const double spaceXs = 4, spaceSm = 8, spaceMd = 16, spaceLg = 24, spaceXl = 40;
  static const double radiusSm = 6, radiusMd = 8, radiusLg = 10, radiusXl = 20, radiusFull = 999;
  static const double bpSm = 640, bpMd = 768, bpLg = 1024, bpXl = 1280;
}
